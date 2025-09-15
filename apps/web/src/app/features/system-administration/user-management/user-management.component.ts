import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserManagementService, User, UserSearchParams, ApiResponse } from './user-management.service';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';

interface UserDisplay extends User {
  name: string;
  lastLogin: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, UserFormModalComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  // Data properties
  users: UserDisplay[] = [];
  loading = false;
  error: string | null = null;

  // Search and pagination
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;
  totalPages = 0;

  // Filters
  statusFilter: 'Active' | 'Inactive' | '' = '';
  roleFilter: 'Admin' | 'HR' | 'Employee' | 'Manager' | 'Applicant' | '' = '';

  // Available options
  availableRoles: string[] = [];
  availableStatuses: string[] = [];

  // Modal state
  showUserModal = false;
  selectedUser: User | null = null;
  isEditMode = false;

  constructor(private userService: UserManagementService) {
    // Setup search debouncing
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.currentPage = 1;
        this.loadUsers();
      });
  }

  ngOnInit() {
    // Initialize available options
    this.availableRoles = this.userService.getAvailableRoles();
    this.availableStatuses = this.userService.getAvailableStatuses();
    
    this.loadUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Load users from backend
  loadUsers() {
    this.loading = true;
    this.error = null;

    const params: UserSearchParams = {
      page: this.currentPage,
      limit: this.pageSize,
      search: this.searchTerm || undefined,
      status: this.statusFilter || undefined,
      role: this.roleFilter || undefined,
      sortBy: 'created_at',
      sortOrder: 'desc'
    };

    this.userService.getUsers(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<User[]>) => {
          if (response.success && response.data) {
            this.users = response.data.map(user => ({
              ...user,
              name: user.username, // For now, use username as display name
              lastLogin: this.formatDate(user.createdAt) // Placeholder - would need last login tracking
            }));
            this.totalUsers = response.pagination?.total || 0;
            this.totalPages = response.pagination?.totalPages || 0;
          } else {
            this.error = response.error?.message || 'Failed to load users';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.error = 'Failed to load users. Please try again.';
          this.loading = false;
        }
      });
  }

  // Search handling
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  // Filter handling
  onStatusFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusFilter = target.value as any;
    this.currentPage = 1;
    this.loadUsers();
  }

  onRoleFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.roleFilter = target.value as any;
    this.currentPage = 1;
    this.loadUsers();
  }

  // Pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // User actions
  onNewUser() {
    this.selectedUser = null;
    this.isEditMode = false;
    this.showUserModal = true;
  }

  onViewUser(user: UserDisplay) {
    console.log('View user:', user.name);
    // TODO: Open view user modal
  }

  onEditUser(user: UserDisplay) {
    this.selectedUser = user;
    this.isEditMode = true;
    this.showUserModal = true;
  }

  onCloseModal() {
    this.showUserModal = false;
    this.selectedUser = null;
    this.isEditMode = false;
  }

  onUserSaved(user: User) {
    this.loadUsers(); // Reload the list
    this.onCloseModal();
  }

  onDeleteUser(user: UserDisplay) {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      this.userService.deleteUser(user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.loadUsers(); // Reload the list
            } else {
              this.error = response.error?.message || 'Failed to delete user';
            }
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.error = 'Failed to delete user. Please try again.';
          }
        });
    }
  }

  onToggleStatus(user: UserDisplay) {
    this.userService.toggleUserStatus(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // Update the user in the list
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
              this.users[index] = {
                ...response.data,
                name: response.data.username,
                lastLogin: this.formatDate(response.data.createdAt)
              };
            }
          } else {
            this.error = response.error?.message || 'Failed to toggle user status';
          }
        },
        error: (error) => {
          console.error('Error toggling user status:', error);
          this.error = 'Failed to toggle user status. Please try again.';
        }
      });
  }

  // Utility methods
  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  trackByUserId(index: number, user: UserDisplay): string {
    return user.id;
  }

  // Utility method for template
  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
} 