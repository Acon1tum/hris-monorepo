import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = [
    { title: 'Total Employees', value: 150, icon: 'people', color: 'primary' },
    { title: 'Active Leaves', value: 12, icon: 'event_available', color: 'accent' },
    { title: 'Pending Approvals', value: 8, icon: 'pending', color: 'warn' },
    { title: 'This Month Payroll', value: '$125,000', icon: 'account_balance_wallet', color: 'primary' }
  ];

  recentActivities = [
    { action: 'New employee registered', user: 'John Doe', time: '2 hours ago' },
    { action: 'Leave request submitted', user: 'Jane Smith', time: '4 hours ago' },
    { action: 'Payroll processed', user: 'System', time: '1 day ago' },
    { action: 'Performance review completed', user: 'Mike Johnson', time: '2 days ago' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
