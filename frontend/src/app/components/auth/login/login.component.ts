
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  loading: boolean = false;
  errorMessage: string = '';
  returnUrl: string = '/tasks';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // If already logged in, redirect to tasks
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
      return;
    }

    // Get return url from route parameters or default to '/tasks'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tasks';
  }

  onSubmit(): void {
    // Validate
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    console.log('Logging in with:', { username: this.loginData.username });

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('✅ Login successful');
        this.loading = false;
        
        // Navigate to return url or tasks
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        console.error('❌ Login failed:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
        
        this.loading = false;
      }
    });
  }
}