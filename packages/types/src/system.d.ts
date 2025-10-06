import { BaseEntity } from './common';
export interface SystemSetting extends BaseEntity {
    settingKey: string;
    settingValue: string;
}
export interface SystemModule extends BaseEntity {
    moduleName: string;
    isActive: boolean;
    canBeDisabled: boolean;
    lastUpdated: Date;
}
export interface CreateSystemSettingRequest {
    settingKey: string;
    settingValue: string;
}
export interface UpdateSystemSettingRequest {
    settingValue: string;
}
export interface UpdateSystemModuleRequest {
    isActive: boolean;
}
//# sourceMappingURL=system.d.ts.map