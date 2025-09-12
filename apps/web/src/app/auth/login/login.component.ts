import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();

  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  isLoading = false;
  showPassword = false;
  errorMessage = '';
  sessionTimeoutMessage = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check for session timeout reason from URL parameters
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['reason'] === 'session_timeout') {
        this.sessionTimeoutMessage = 'Your session has expired due to inactivity. Please log in again.';
      }
    });

    // Check for logout reason from auth service
    const logoutReason = this.authService.getAndClearLogoutReason();
    if (logoutReason === 'session_timeout') {
      this.sessionTimeoutMessage = 'Your session has expired due to inactivity. Please log in again.';
    }
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        
        // Check if user is an Applicant
        if (user.role === 'Applicant') {
          // Logout the user since they shouldn't be using this login
          this.authService.logout();
          this.errorMessage = 'Applicant accounts should use the Job Portal Login. Please use the link below.';
          this.isLoading = false;
          return;
        }
        
        // Emit login success event
        this.loginSuccess.emit();

        // Navigate to appropriate dashboard based on role
        const landingPage = this.authService.getLandingPageByRole(user.role || 'User');
        this.router.navigate([landingPage]);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Login error:', error);
        
        // Handle rate limiting specifically
        if (error.message && error.message.includes('Too many login attempts')) {
          const retryInfo = this.authService.getRetryInfo();
          this.errorMessage = `${error.message} ${retryInfo.message}`;
        } else {
          this.errorMessage = error.message || 'Login failed. Please try again.';
        }
        
        this.isLoading = false;
      }
    });
  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onForgotPassword() {
    // Implement forgot password functionality
    console.log('Forgot password clicked');
    // You can navigate to a forgot password page or show a modal
  }

  onDemoLogin(role: string) {
    this.isLoading = true;
    this.errorMessage = '';

    // Check if trying to login as Applicant
    if (role.toLowerCase() === 'applicant') {
      this.errorMessage = 'Applicant accounts should use the Job Portal Login. Please use the link below.';
      this.isLoading = false;
      return;
    }

    // Set demo credentials based on seed data
    switch (role.toLowerCase()) {
      case 'admin':
        this.loginData.email = 'secretary@govagency.ph';
        this.loginData.password = 'password123';
        break;
      case 'hr':
        this.loginData.email = 'hr.director@govagency.ph';
        this.loginData.password = 'password123';
        break;
      case 'employee':
        this.loginData.email = 'admin.officer@govagency.ph';
        this.loginData.password = 'password123';
        break;
      default:
        this.loginData.email = 'secretary@govagency.ph';
        this.loginData.password = 'password123';
    }
    
    // Use the demoLogin method from auth service for consistency
    this.authService.demoLogin(role).subscribe({
      next: (user) => {
        console.log('Demo login successful:', user);
        
        // Check if user is an Applicant (double-check)
        if (user.role === 'Applicant') {
          // Logout the user since they shouldn't be using this login
          this.authService.logout();
          this.errorMessage = 'Applicant accounts should use the Job Portal Login. Please use the link below.';
          this.isLoading = false;
          return;
        }
        
        // Emit login success event
        this.loginSuccess.emit();

        // Navigate to appropriate dashboard based on role
        const landingPage = this.authService.getLandingPageByRole(user.role || 'User');
        this.router.navigate([landingPage]);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Demo login error:', error);
        
        // Handle rate limiting specifically
        if (error.message && error.message.includes('Too many login attempts')) {
          const retryInfo = this.authService.getRetryInfo();
          this.errorMessage = `${error.message} ${retryInfo.message}`;
        } else {
          this.errorMessage = error.message || 'Demo login failed. Please try again.';
        }
        
        this.isLoading = false;
      }
    });
  }

  openJobPortal() {
    // Set a flag to indicate public job portal mode
    localStorage.setItem('jobPortalPublicMode', 'true');
    this.router.navigate(['/online-job-application-portal']);
  }

  goToJobPortalLogin() {
    this.router.navigate(['/online-job-login']);
  }

  onResetRateLimit() {
    // Clear rate limiting information
    this.authService.clearRateLimitInfo().subscribe({
      next: (response) => {
        this.errorMessage = '';
        console.log('Rate limit information cleared:', response);
      },
      error: (error) => {
        console.error('Error clearing rate limit:', error);
        // Still clear the error message even if server call fails
        this.errorMessage = '';
      }
    });
  }
} 