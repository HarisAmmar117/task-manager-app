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
  ) {}

  // ✅ Register + Auto Login
  register(registerData: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, registerData, {
      responseType: 'text'
    }).pipe(
      tap(res => {
        console.log('✅ Register response:', res);

        // ❌ no auto-login possible (no token)
        this.router.navigate(['/login']);
      })
    );
  }

  // ✅ Login
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          console.log('✅ Login response:', response);
          this.handleAuthSuccess(response);

          this.router.navigate(['/tasks']);
        })
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('userId', response.id.toString());
    localStorage.setItem('userEmail', response.email);
    localStorage.setItem('userRole', response.role);

    this.currentUserSubject.next(response.username);

    console.log('✅ User stored & logged in');
  }
}