import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HRIS System';
  opened = true;

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { name: 'Employee Self Service', icon: 'person', route: '/employee-self-service' },
    { name: 'Personnel Information', icon: 'people', route: '/personnel-information' },
    { name: 'Leave Management', icon: 'event_available', route: '/leave-management' },
    { name: 'Timekeeping & Attendance', icon: 'schedule', route: '/timekeeping-attendance' },
    { name: 'Payroll Management', icon: 'account_balance_wallet', route: '/payroll-management' },
    { name: 'Performance Management', icon: 'trending_up', route: '/performance-management' },
    { name: 'Recruitment', icon: 'work', route: '/recruitment' },
    { name: 'Job Portal Management', icon: 'business_center', route: '/job-portal-management' },
    { name: 'Online Job Application', icon: 'assignment', route: '/online-job-application' },
    { name: 'Health & Wellness', icon: 'health_and_safety', route: '/health-wellness' },
    { name: 'Report Generation', icon: 'assessment', route: '/report-generation' },
    { name: 'System Administration', icon: 'settings', route: '/system-administration' }
  ];

  toggleSidenav() {
    this.opened = !this.opened;
  }
}
