import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    // Check for existing token on service initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.loadUserFromToken();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private loadUserFromToken(): void {
    // In a real app, you might want to validate the token with the server
    // For now, we'll just check if it exists
    const token = this.getToken();
    if (token) {
      // You could decode the JWT token here to get user info
      // For now, we'll set a placeholder user
      this.currentUserSubject.next({
        id: '1',
        email: 'user@example.com',
        name: 'Current User',
        role: 'employee'
      });
    }
  }
}

