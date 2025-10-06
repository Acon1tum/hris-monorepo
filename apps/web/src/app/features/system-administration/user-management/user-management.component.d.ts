import { OnInit, OnDestroy } from '@angular/core';
import { UserManagementService, User } from './user-management.service';
interface UserDisplay extends User {
    name: string;
    lastLogin: string;
}
export declare class UserManagementComponent implements OnInit, OnDestroy {
    private userService;
    private destroy$;
    private searchSubject;
    users: UserDisplay[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    currentPage: number;
    pageSize: number;
    totalUsers: number;
    totalPages: number;
    statusFilter: 'Active' | 'Inactive' | '';
    roleFilter: 'Admin' | 'HR' | 'Employee' | 'Manager' | 'Applicant' | '';
    availableRoles: string[];
    availableStatuses: string[];
    showUserModal: boolean;
    selectedUser: User | null;
    isEditMode: boolean;
    constructor(userService: UserManagementService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadUsers(): void;
    onSearch(event: Event): void;
    onStatusFilterChange(event: Event): void;
    onRoleFilterChange(event: Event): void;
    onPageChange(page: number): void;
    getPageNumbers(): number[];
    onNewUser(): void;
    onViewUser(user: UserDisplay): void;
    onEditUser(user: UserDisplay): void;
    onCloseModal(): void;
    onUserSaved(user: User): void;
    onDeleteUser(user: UserDisplay): void;
    onToggleStatus(user: UserDisplay): void;
    private formatDate;
    trackByUserId(index: number, user: UserDisplay): string;
    getMathMin(a: number, b: number): number;
}
export {};
//# sourceMappingURL=user-management.component.d.ts.map