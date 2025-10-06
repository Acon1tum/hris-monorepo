import { BaseEntity } from './common';
export interface Notification extends BaseEntity {
    userId: string;
    notificationType?: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
export interface CreateNotificationRequest {
    userId: string;
    notificationType?: string;
    message: string;
}
export interface UpdateNotificationRequest {
    isRead?: boolean;
}
export interface MarkAsReadRequest {
    notificationIds: string[];
}
//# sourceMappingURL=notification.d.ts.map