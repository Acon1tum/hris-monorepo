# User Management System

A comprehensive user management system with full CRUD operations, built with Angular frontend and Node.js/Express backend.

## Features

### Backend API (`/api/admin/users`)

- **GET /users** - List all users with pagination, search, and filtering
- **GET /users/:id** - Get user details by ID
- **POST /users** - Create a new user
- **PUT /users/:id** - Update user information
- **DELETE /users/:id** - Delete a user
- **PATCH /users/:id/toggle-status** - Toggle user active/inactive status

### Frontend Features

- **User List** - Paginated table with search and filtering
- **User Creation** - Modal form for creating new users
- **User Editing** - Modal form for updating user information
- **User Actions** - View, edit, delete, and toggle status
- **Real-time Search** - Debounced search with instant results
- **Filtering** - Filter by status and role
- **Responsive Design** - Mobile-friendly interface

## API Endpoints

### Authentication Required
All endpoints require authentication with Admin or HR role.

### Query Parameters (GET /users)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term for username/email
- `sortBy` - Sort field (default: 'createdAt')
- `sortOrder` - Sort direction: 'asc' or 'desc' (default: 'desc')
- `status` - Filter by status: 'Active' or 'Inactive'
- `role` - Filter by role: 'Admin', 'HR', 'Employee', 'Manager', 'Applicant'

### Request/Response Examples

#### Create User
```http
POST /api/admin/users
Content-Type: application/json

{
  "username": "john.doe",
  "email": "john.doe@company.com",
  "password": "securepassword123",
  "role": "Employee",
  "profilePicture": "https://example.com/avatar.jpg"
}
```

#### Update User
```http
PUT /api/admin/users/:id
Content-Type: application/json

{
  "username": "john.doe.updated",
  "email": "john.updated@company.com",
  "role": "Manager",
  "status": "Active"
}
```

#### Response Format
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "john.doe",
    "email": "john.doe@company.com",
    "profilePicture": "https://example.com/avatar.jpg",
    "status": "Active",
    "role": "Employee",
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T10:00:00.000Z"
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## Frontend Components

### UserManagementComponent
Main component that displays the user list and handles user actions.

**Key Features:**
- Real-time search with debouncing
- Pagination with page numbers
- Status and role filtering
- User action buttons (view, edit, delete, toggle status)
- Loading states and error handling

### UserFormModalComponent
Modal component for creating and editing users.

**Key Features:**
- Form validation with error messages
- Support for both create and edit modes
- Password field handling (optional for edit)
- Role and status selection
- Profile picture URL input

### UserManagementService
Service for API communication.

**Methods:**
- `getUsers(params)` - Get paginated user list
- `getUserById(id)` - Get user by ID
- `createUser(userData)` - Create new user
- `updateUser(id, userData)` - Update user
- `deleteUser(id)` - Delete user
- `toggleUserStatus(id)` - Toggle user status

## Database Schema

The user management system uses the following Prisma schema:

```prisma
model User {
  id              String   @id @default(uuid())
  username        String   @unique
  password_hash   String
  email           String   @unique
  profile_picture String?
  status          Status   @default(Active)
  role            RoleType
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
}

enum RoleType {
  Admin
  HR
  Employee
  Manager
  Applicant
}

enum Status {
  Active
  Inactive
}
```

## Security Features

- Password hashing with bcrypt (12 rounds)
- Input validation and sanitization
- Role-based access control
- SQL injection prevention through Prisma ORM
- XSS protection through Angular's built-in sanitization

## Error Handling

### Backend
- Comprehensive error handling in controllers
- Validation middleware for request data
- Proper HTTP status codes
- Detailed error messages for debugging

### Frontend
- User-friendly error messages
- Loading states for better UX
- Form validation with real-time feedback
- Graceful error recovery

## Testing

Run the API test script to verify functionality:

```bash
cd apps/api
node test-user-api.js
```

## Usage

1. **View Users**: Navigate to the user management page to see all users
2. **Search**: Use the search bar to find users by name or email
3. **Filter**: Use the status and role dropdowns to filter users
4. **Create User**: Click "New User" button to open the creation modal
5. **Edit User**: Click the edit button (pencil icon) next to any user
6. **Delete User**: Click the delete button (trash icon) to remove a user
7. **Toggle Status**: Click the toggle button to activate/deactivate users

## Future Enhancements

- [ ] Bulk user operations
- [ ] User import/export functionality
- [ ] Advanced user permissions
- [ ] User activity logging
- [ ] Password reset functionality
- [ ] User profile pictures upload
- [ ] Advanced search filters
- [ ] User groups and departments
