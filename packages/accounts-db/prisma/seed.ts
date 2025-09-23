import { PrismaClient } from '@prisma/client-accounts';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding accounts DB...');

  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: passwordHash,
      firstName: 'System',
      lastName: 'Admin'
    }
  });

  console.log('✅ Created default admin:', admin.username);
}

main().catch((e) => {
  console.error('❌ Accounts seed failed:', e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});


