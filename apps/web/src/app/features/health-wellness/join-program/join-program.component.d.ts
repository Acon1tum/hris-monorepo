import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface Program {
    type: string;
    title: string;
    description: string;
    image: string;
}
export declare class JoinProgramComponent implements OnInit {
    private router;
    constructor(router: Router);
    programs: Program[];
    joinProgram(program: Program): void;
    goBack(): void;
    ngOnInit(): void;
}
export {};
//# sourceMappingURL=join-program.component.d.ts.map