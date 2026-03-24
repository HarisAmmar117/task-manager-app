
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Register new user
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerData)
      .pipe(
        tap(response => {
          console.log('✅ Register response:', response);
          this.handleAuthSuccess(response);
        })
      );
  }

  // Login user
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          console.log('✅ Login response:', response);
          this.handleAuthSuccess(response);
        })
      );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Get stored username
  getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Get current user
  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  // Get user ID
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }

  // Get user email
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Get user role
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Handle successful authentication
  private handleAuthSuccess(response: AuthResponse): void {
    // Store token
    localStorage.setItem('authToken', response.token);
    
    // Store user info
    localStorage.setItem('username', response.username);
    localStorage.setItem('userId', response.id.toString());
    localStorage.setItem('userEmail', response.email);
    localStorage.setItem('userRole', response.role);
    
    // Update subject
    this.currentUserSubject.next(response.username);
    
    console.log('User data stored in localStorage');
  }
}