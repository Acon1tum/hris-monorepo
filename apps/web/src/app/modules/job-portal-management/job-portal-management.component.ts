import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-portal-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <div class="module-container">
      <h1>Job Portal Management</h1>
      <mat-card>
        <mat-card-content>
          <p>Job portal management module for posting job openings, managing applications, and tracking recruitment processes.</p>
          <p>This module is under development.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .module-container {
      padding: 20px;
    }
  `]
})
export class JobPortalManagementComponent { }
