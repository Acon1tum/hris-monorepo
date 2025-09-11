# HRIS Database Package

This package contains the Prisma ORM configuration and database schema for the HRIS system.

## Database Setup

### Prerequisites
- PostgreSQL database server running
- Environment variables configured in `.env`

### Environment Variables
Create a `.env` file in the project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hris_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# API
API_PORT=3000
API_HOST=localhost
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:4200"
```

### Setup Commands

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Generate Prisma client:**
   ```bash
   pnpm db:generate
   ```

3. **Push schema to database:**
   ```bash
   pnpm db:push
   ```

4. **Seed the database with sample data:**
   ```bash
   pnpm db:seed
   ```

5. **View database in Prisma Studio:**
   ```bash
   pnpm db:studio
   ```

## Database Schema

The database includes the following main entities:

### Core Entities
- **User** - System users with authentication
- **Personnel** - Employee records with government-specific fields
- **Department** - Organizational units
- **JobTitle** - Position classifications with salary grades

### HR Modules
- **Leave Management** - Leave types, balances, applications
- **Timekeeping** - Work schedules, attendance logs, overtime
- **Payroll** - Payroll records, deductions, loans
- **Performance** - Reviews and evaluations
- **Recruitment** - Job postings, applications, interviews

### Government-Specific Features
- **CSC Eligibility** - Civil Service Commission requirements
- **Plantilla Positions** - Regular government positions
- **Salary Grades** - SG-1 to SG-33 classification
- **Agency Codes** - Government agency identification
- **Office Codes** - Department/unit identification

## Sample Data

The seed script creates:
- 8 users with different roles (Admin, HR, Manager, Employee)
- 5 departments (Office of the Secretary, HR, Finance, IT, Legal)
- 6 job titles with salary grades
- 8 personnel records with complete information
- 6 leave types (Vacation, Sick, Emergency, Maternity, Paternity, Study)
- 3 work schedules (Regular, Flexible, Work From Home)
- 2 job postings
- 2 training programs
- System settings and modules

## Default Login Credentials

| Username | Password | Role |
|----------|----------|------|
| secretary | password123 | Admin |
| hr_director | password123 | HR |
| finance_director | password123 | Manager |
| it_chief | password123 | Manager |
| legal_chief | password123 | Manager |
| admin_officer | password123 | Employee |
| programmer | password123 | Employee |
| clerk | password123 | Employee |

## Development

### Watch Mode
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Type Checking
```bash
pnpm type-check
```

## Database Migrations

For production deployments, use migrations instead of `db:push`:

```bash
# Create a new migration
pnpm db:migrate

# Apply migrations
pnpm db:migrate
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if PostgreSQL is running
   - Verify DATABASE_URL in .env file
   - Ensure database exists

2. **Prisma Client Not Found**
   - Run `pnpm db:generate`
   - Check if @prisma/client is installed

3. **Permission Denied**
   - Check database user permissions
   - Ensure user has CREATE, DROP, ALTER privileges

4. **Schema Sync Issues**
   - Run `pnpm db:push --force-reset` (⚠️ This will delete all data)
   - Or use `pnpm db:migrate` for proper migrations

