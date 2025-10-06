import { OnInit } from '@angular/core';
export interface Request {
    id: number;
    type: string;
    dateFiled: Date;
    status: 'approved' | 'pending' | 'rejected' | 'cancelled';
    remarks: string;
    attachment?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
}
export interface RequestTab {
    id: string;
    label: string;
    count?: number;
}
export declare class MyRequestsComponent implements OnInit {
    title: string;
    Math: Math;
    activeTab: string;
    tabs: RequestTab[];
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    showNewRequestModal: boolean;
    showRequestDetailModal: boolean;
    selectedRequest: Request | null;
    newRequest: {
        type: string;
        description: string;
        priority: "low" | "medium" | "high";
        attachment: string;
    };
    requests: Request[];
    ngOnInit(): void;
    setActiveTab(tab: string): void;
    updateTabCounts(): void;
    get filteredRequests(): Request[];
    get paginatedRequests(): Request[];
    get totalPages(): number;
    get hasNextPage(): boolean;
    get hasPreviousPage(): boolean;
    nextPage(): void;
    previousPage(): void;
    goToPage(page: number): void;
    openNewRequestModal(): void;
    closeNewRequestModal(): void;
    resetNewRequestForm(): void;
    createNewRequest(): void;
    viewRequest(request: Request): void;
    closeRequestDetailModal(): void;
    cancelRequest(requestId: number): void;
    downloadAttachment(attachment: string): void;
    getStatusBadgeClass(status: string): string;
    getPriorityBadgeClass(priority: string): string;
    formatDate(date: Date): string;
    getStatusIcon(status: string): string;
    canCancelRequest(request: Request): boolean;
}
//# sourceMappingURL=my-requests.component.d.ts.map