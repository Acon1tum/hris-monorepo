# HRIS Monorepo

A comprehensive Human Resources Information System built with Angular frontend, Express backend, and shared packages using Turborepo and pnpm workspaces.

## 🏗️ Architecture

This monorepo contains:

- **Frontend**: Angular application with modular structure
- **Backend**: Express.js API with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Shared Packages**: Types, utilities, and database client

## 📁 Project Structure

```
hris-monorepo/
├── apps/
│   ├── web/                      # Angular frontend
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── core/         # Auth, interceptors, base services
│   │   │       ├── shared/       # Shared UI components, pipes
│   │   │       └── modules/      # Feature modules
│   │   └── ...
│   └── api/                      # Express backend
│       ├── src/
│       │   ├── modules/          # Feature modules
│       │   ├── middleware/       # Express middleware
│       │   └── ...
│       └── ...
│
├── packages/
│   ├── db/                       # Prisma ORM schema and client
│   ├── types/                    # Shared TypeScript interfaces
│   └── utils/                    # Shared utility functions
│
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other configurations
   ```

4. Set up the database:
   ```bash
   pnpm db:generate:all
   pnpm db:push:all
   ```

5. Set up seed:
 ```bash
   pnpm db:seed:all // to generate dummy data for all database
   pnpm (module):seed // for example: pnpm accounts:seed //to generate dummy data for accounts only
   ```

### Development

Start all applications in development mode:
```bash
pnpm dev:apps
```

Start specific applications:
```bash
# Frontend only
pnpm web:dev

# Backend only
pnpm api:dev
```

### Building

Build all applications:
```bash
pnpm build
```

## 📦 Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all packages
- `pnpm test` - Run tests
- `pnpm clean` - Clean all build artifacts
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
-  npm --filter @hris/db run db:studio

## 🏢 HRIS Modules

The system includes the following modules:

- **Employee Self Service** - Personal information management
- **Personnel Information Management** - Employee records
- **Leave Management** - Leave requests and approvals
- **Timekeeping & Attendance** - Time tracking
- **Payroll Management** - Salary processing
- **Performance Management** - Employee evaluations
- **Recruitment** - Hiring process management
- **Job Portal Management** - Job postings
- **Online Job Application Portal** - External applications
- **Health & Wellness** - Health records and programs
- **Report Generation** - HR reports and analytics
- **System Administration** - User and system management

## 🛠️ Technology Stack

- **Frontend**: Angular 17, Angular Material, TypeScript
- **Backend**: Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Monorepo**: Turborepo, pnpm workspaces
- **Build Tools**: TypeScript, ESLint

## 📝 License

This project is private and proprietary.
