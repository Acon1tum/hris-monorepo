export interface InterviewInfo {
    id: string;
    jobTitle: string;
    company: string;
    date: Date;
    time?: string;
    status?: string;
    department?: string;
}
export declare class InterviewService {
    private interviewsSubject;
    interviews$: import("rxjs").Observable<InterviewInfo[]>;
    setInterviews(interviews: InterviewInfo[]): void;
    getInterviews(): InterviewInfo[];
}
//# sourceMappingURL=interview.service.d.ts.map