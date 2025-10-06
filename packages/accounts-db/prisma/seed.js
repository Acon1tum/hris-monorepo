"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_accounts_1 = require("@prisma/client-accounts");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_accounts_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding accounts DB...');
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
    const passwordHash = await bcryptjs_1.default.hash('password123', 12);
    // Create all users from the main HRIS seed
    const secretary = await prisma.user.create({
        data: {
            email: 'secretary@govagency.ph',
            username: 'secretary',
            password: passwordHash,
            firstName: 'Juan',
            lastName: 'Dela Cruz',
            role: 'Admin'
        }
    });
    const hrDirector = await prisma.user.create({
        data: {
            email: 'hr.director@govagency.ph',
            username: 'hr_director',
            password: passwordHash,
            firstName: 'Maria',
            lastName: 'Santos',
            role: 'HR'
        }
    });
    const financeDirector = await prisma.user.create({
        data: {
            email: 'finance.director@govagency.ph',
            username: 'finance_director',
            password: passwordHash,
            firstName: 'Jose',
            lastName: 'Garcia',
            role: 'Manager'
        }
    });
    const itChief = await prisma.user.create({
        data: {
            email: 'it.chief@govagency.ph',
            username: 'it_chief',
            password: passwordHash,
            firstName: 'Ana',
            lastName: 'Rodriguez',
            role: 'Manager'
        }
    });
    const legalChief = await prisma.user.create({
        data: {
            email: 'legal.chief@govagency.ph',
            username: 'legal_chief',
            password: passwordHash,
            firstName: 'Pedro',
            lastName: 'Martinez',
            role: 'Manager'
        }
    });
    const adminOfficer = await prisma.user.create({
        data: {
            email: 'admin.officer@govagency.ph',
            username: 'admin_officer',
            password: passwordHash,
            firstName: 'Carmen',
            lastName: 'Lopez',
            role: 'Employee'
        }
    });
    const programmer = await prisma.user.create({
        data: {
            email: 'programmer@govagency.ph',
            username: 'programmer',
            password: passwordHash,
            firstName: 'Roberto',
            lastName: 'Cruz',
            role: 'Employee'
        }
    });
    const clerk = await prisma.user.create({
        data: {
            email: 'clerk@govagency.ph',
            username: 'clerk',
            password: passwordHash,
            firstName: 'Elena',
            lastName: 'Reyes',
            role: 'Employee'
        }
    });
    console.log('✅ Created 8 users in accounts DB');
    console.log('\n🔑 Available login credentials:');
    console.log('Username: secretary | Password: password123 (Admin)');
    console.log('Username: hr_director | Password: password123 (HR)');
    console.log('Username: finance_director | Password: password123 (Manager)');
    console.log('Username: it_chief | Password: password123 (Manager)');
    console.log('Username: legal_chief | Password: password123 (Manager)');
    console.log('Username: admin_officer | Password: password123 (Employee)');
    console.log('Username: programmer | Password: password123 (Employee)');
    console.log('Username: clerk | Password: password123 (Employee)');
}
main().catch((e) => {
    console.error('❌ Accounts seed failed:', e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map