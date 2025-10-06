"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const user_management_service_1 = require("./user-management.service");
const user_form_modal_component_1 = require("./user-form-modal/user-form-modal.component");
let UserManagementComponent = class UserManagementComponent {
    userService;
    destroy$ = new rxjs_1.Subject();
    searchSubject = new rxjs_1.Subject();
    // Data properties
    users = [];
    loading = false;
    error = null;
    // Search and pagination
    searchTerm = '';
    currentPage = 1;
    pageSize = 10;
    totalUsers = 0;
    totalPages = 0;
    // Filters
    statusFilter = '';
    roleFilter = '';
    // Available options
    availableRoles = [];
    availableStatuses = [];
    // Modal state
    showUserModal = false;
    selectedUser = null;
    isEditMode = false;
    constructor(userService) {
        this.userService = userService;
        // Setup search debouncing
        this.searchSubject
            .pipe((0, rxjs_1.debounceTime)(300), (0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.takeUntil)(this.destroy$))
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
        const params = {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchTerm || undefined,
            status: this.statusFilter || undefined,
            role: this.roleFilter || undefined,
            sortBy: 'created_at',
            sortOrder: 'desc'
        };
        this.userService.getUsers(params)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.users = response.data.map(user => ({
                        ...user,
                        name: user.username, // For now, use username as display name
                        lastLogin: this.formatDate(user.createdAt) // Placeholder - would need last login tracking
                    }));
                    this.totalUsers = response.pagination?.total || 0;
                    this.totalPages = response.pagination?.totalPages || 0;
                }
                else {
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
    onSearch(event) {
        const target = event.target;
        this.searchSubject.next(target.value);
    }
    // Filter handling
    onStatusFilterChange(event) {
        const target = event.target;
        this.statusFilter = target.value;
        this.currentPage = 1;
        this.loadUsers();
    }
    onRoleFilterChange(event) {
        const target = event.target;
        this.roleFilter = target.value;
        this.currentPage = 1;
        this.loadUsers();
    }
    // Pagination
    onPageChange(page) {
        this.currentPage = page;
        this.loadUsers();
    }
    getPageNumbers() {
        const pages = [];
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
    onViewUser(user) {
        console.log('View user:', user.name);
        // TODO: Open view user modal
    }
    onEditUser(user) {
        this.selectedUser = user;
        this.isEditMode = true;
        this.showUserModal = true;
    }
    onCloseModal() {
        this.showUserModal = false;
        this.selectedUser = null;
        this.isEditMode = false;
    }
    onUserSaved(user) {
        this.loadUsers(); // Reload the list
        this.onCloseModal();
    }
    onDeleteUser(user) {
        if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            this.userService.deleteUser(user.id)
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (response) => {
                    if (response.success) {
                        this.loadUsers(); // Reload the list
                    }
                    else {
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
    onToggleStatus(user) {
        this.userService.toggleUserStatus(user.id)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
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
                }
                else {
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
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    trackByUserId(index, user) {
        return user.id;
    }
    // Utility method for template
    getMathMin(a, b) {
        return Math.min(a, b);
    }
};
exports.UserManagementComponent = UserManagementComponent;
exports.UserManagementComponent = UserManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-user-management',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule, user_form_modal_component_1.UserFormModalComponent],
        templateUrl: './user-management.component.html',
        styleUrls: ['./user-management.component.scss']
    }),
    __metadata("design:paramtypes", [user_management_service_1.UserManagementService])
], UserManagementComponent);
//# sourceMappingURL=user-management.component.js.map