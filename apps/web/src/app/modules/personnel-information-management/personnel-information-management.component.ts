import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personnel-information-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <div class="module-container">
      <h1>Personnel Information Management</h1>
      <mat-card>
        <mat-card-content>
          <p>Personnel information management module for maintaining employee records and data.</p>
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
export class PersonnelInformationManagementComponent { }