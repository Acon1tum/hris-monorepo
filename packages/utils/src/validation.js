"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSalary = exports.isValidDate = exports.sanitizeString = exports.isValidEmployeeId = exports.isValidPassword = exports.isValidPhone = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};
exports.isValidPhone = isValidPhone;
const isValidPassword = (password) => {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
exports.isValidPassword = isValidPassword;
const isValidEmployeeId = (employeeId) => {
    // Example: EMP-2024-001
    const employeeIdRegex = /^EMP-\d{4}-\d{3}$/;
    return employeeIdRegex.test(employeeId);
};
exports.isValidEmployeeId = isValidEmployeeId;
const sanitizeString = (str) => {
    return str.trim().replace(/[<>]/g, '');
};
exports.sanitizeString = sanitizeString;
const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
exports.isValidDate = isValidDate;
const isValidSalary = (salary) => {
    return typeof salary === 'number' && salary >= 0 && !isNaN(salary);
};
exports.isValidSalary = isValidSalary;
//# sourceMappingURL=validation.js.map