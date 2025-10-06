interface LeaveType {
    id: number;
    name: string;
    description: string;
}
interface ParameterTab {
    id: string;
    name: string;
    active: boolean;
}
export declare class SystemParametersComponent {
    searchTerm: string;
    activeTab: string;
    tabs: ParameterTab[];
    leaveTypes: LeaveType[];
    currentPage: number;
    itemsPerPage: number;
    onSearch(event: Event): void;
    onTabChange(tabId: string): void;
    onAddLeaveType(): void;
    onEditLeaveType(leaveType: LeaveType): void;
    onDeleteLeaveType(leaveType: LeaveType): void;
    get filteredLeaveTypes(): LeaveType[];
    get paginatedLeaveTypes(): LeaveType[];
    get totalPages(): number;
    get displayStart(): number;
    get displayEnd(): number;
    get displayTotal(): number;
    onPreviousPage(): void;
    onNextPage(): void;
    get canGoToPrevious(): boolean;
    get canGoToNext(): boolean;
    trackByLeaveTypeId(index: number, leaveType: LeaveType): number;
}
export {};
//# sourceMappingURL=system-parameters.component.d.ts.map