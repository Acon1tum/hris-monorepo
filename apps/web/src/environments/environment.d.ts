export declare const environment: {
    production: boolean;
    apiUrl: string;
    version: string;
    features: {
        enableLogging: boolean;
        enableDebugMode: boolean;
        enableMockData: boolean;
    };
    auth: {
        tokenKey: string;
        refreshTokenKey: string;
        userKey: string;
    };
    session: {
        inactivityTimeout: number;
        warningTime: number;
        checkInterval: number;
    };
    pagination: {
        defaultPageSize: number;
        pageSizeOptions: number[];
    };
    upload: {
        maxFileSize: number;
        allowedFileTypes: string[];
    };
};
//# sourceMappingURL=environment.d.ts.map