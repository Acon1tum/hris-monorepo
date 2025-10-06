"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsController = void 0;
const db_1 = require("@hris/db");
class DepartmentsController {
    static async getAllDepartments(req, res) {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const where = {};
            if (search) {
                where.OR = [
                    { department_name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ];
            }
            const skip = (Number(page) - 1) * Number(limit);
            const take = Number(limit);
            const [departments, total] = await Promise.all([
                db_1.prisma.department.findMany({
                    where,
                    include: {
                        _count: {
                            select: {
                                personnel: true
                            }
                        }
                    },
                    skip,
                    take,
                    orderBy: { department_name: 'asc' }
                }),
                db_1.prisma.department.count({ where })
            ]);
            res.json({
                success: true,
                data: departments,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        }
        catch (error) {
            console.error('Error fetching departments:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    static async getDepartmentById(req, res) {
        try {
            const { id } = req.params;
            const department = await db_1.prisma.department.findUnique({
                where: { id },
                include: {
                    personnel: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            job_title: {
                                select: {
                                    title: true
                                }
                            },
                            user: {
                                select: {
                                    status: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            personnel: true
                        }
                    }
                }
            });
            if (!department) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Department not found' }
                });
            }
            res.json({ success: true, data: department });
        }
        catch (error) {
            console.error('Error fetching department:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    static async createDepartment(req, res) {
        try {
            const { department_name, description, department_head } = req.body;
            if (!department_name) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'Department name is required' }
                });
            }
            // Check if department already exists
            const existingDepartment = await db_1.prisma.department.findFirst({
                where: { department_name: { equals: department_name, mode: 'insensitive' } }
            });
            if (existingDepartment) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'Department with this name already exists' }
                });
            }
            const department = await db_1.prisma.department.create({
                data: {
                    department_name,
                    description,
                    department_head
                }
            });
            res.status(201).json({ success: true, data: department });
        }
        catch (error) {
            console.error('Error creating department:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    static async updateDepartment(req, res) {
        try {
            const { id } = req.params;
            const { department_name, description, department_head } = req.body;
            const existingDepartment = await db_1.prisma.department.findUnique({
                where: { id }
            });
            if (!existingDepartment) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Department not found' }
                });
            }
            // Check if new name conflicts with existing departments
            if (department_name && department_name !== existingDepartment.department_name) {
                const nameConflict = await db_1.prisma.department.findFirst({
                    where: {
                        id: { not: id },
                        department_name: { equals: department_name, mode: 'insensitive' }
                    }
                });
                if (nameConflict) {
                    return res.status(400).json({
                        success: false,
                        error: { message: 'Department with this name already exists' }
                    });
                }
            }
            const updatedDepartment = await db_1.prisma.department.update({
                where: { id },
                data: {
                    department_name,
                    description,
                    department_head
                }
            });
            res.json({ success: true, data: updatedDepartment });
        }
        catch (error) {
            console.error('Error updating department:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    static async deleteDepartment(req, res) {
        try {
            const { id } = req.params;
            const department = await db_1.prisma.department.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            personnel: true
                        }
                    }
                }
            });
            if (!department) {
                return res.status(404).json({
                    success: false,
                    error: { message: 'Department not found' }
                });
            }
            if (department._count.personnel > 0) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'Cannot delete department with assigned personnel' }
                });
            }
            await db_1.prisma.department.delete({
                where: { id }
            });
            res.json({ success: true, message: 'Department deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting department:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    static async getDepartmentStats(req, res) {
        try {
            const [totalDepartments, departmentsWithPersonnel, totalPersonnel] = await Promise.all([
                db_1.prisma.department.count(),
                db_1.prisma.department.count({
                    where: {
                        personnel: {
                            some: {}
                        }
                    }
                }),
                db_1.prisma.personnel.count()
            ]);
            const departmentPersonnelCounts = await db_1.prisma.department.findMany({
                select: {
                    id: true,
                    department_name: true,
                    _count: {
                        select: {
                            personnel: true
                        }
                    }
                },
                orderBy: {
                    personnel: {
                        _count: 'desc'
                    }
                }
            });
            res.json({
                success: true,
                data: {
                    totalDepartments,
                    departmentsWithPersonnel,
                    totalPersonnel,
                    departmentPersonnelCounts
                }
            });
        }
        catch (error) {
            console.error('Error fetching department stats:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
}
exports.DepartmentsController = DepartmentsController;
//# sourceMappingURL=departments.controller.js.map