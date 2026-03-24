
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    username: '',
    password: '',
    email: '',
    fullName: ''
  };

  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    // Validate
    if (!this.registerData.username || !this.registerData.password || 
        !this.registerData.email || !this.registerData.fullName) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Password length validation
    if (this.registerData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Registering user:', { 
      username: this.registerData.username,
      email: this.registerData.email 
    });

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('✅ Registration successful');
        this.loading = false;
        this.successMessage = 'Registration successful! Redirecting to tasks...';
        
        // Redirect to tasks after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1500);
      },
      error: (error) => {
        console.error('❌ Registration failed:', error);
        
        if (error.status === 409) {
          this.errorMessage = 'Username or email already exists';
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        
        this.loading = false;
      }
    });
  }
}