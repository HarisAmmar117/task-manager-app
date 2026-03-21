// src/app/components/task-form/task-form.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    title: '',
    description: '',
    status: 'TO_DO'
  };

  loading: boolean = false;
  errorMessage: string = '';
  
  // Validation errors
  titleError: string = '';
  descriptionError: string = '';

  statusOptions = [
    { value: 'TO_DO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE', label: 'Done' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  // Validate title
  validateTitle(): boolean {
    this.titleError = '';
    
    if (!this.task.title || this.task.title.trim() === '') {
      this.titleError = 'Title is required';
      return false;
    }
    
    if (this.task.title.trim().length < 3) {
      this.titleError = 'Title must be at least 3 characters';
      return false;
    }
    
    if (this.task.title.length > 100) {
      this.titleError = 'Title must not exceed 100 characters';
      return false;
    }
    
    return true;
  }

  // Validate description
  validateDescription(): boolean {
    this.descriptionError = '';
    
    if (!this.task.description || this.task.description.trim() === '') {
      this.descriptionError = 'Description is required';
      return false;
    }
    
    if (this.task.description.length > 500) {
      this.descriptionError = 'Description must not exceed 500 characters';
      return false;
    }
    
    return true;
  }

  // Validate all fields
  validateForm(): boolean {
    const isTitleValid = this.validateTitle();
    const isDescriptionValid = this.validateDescription();
    
    return isTitleValid && isDescriptionValid;
  }

  onSubmit(): void {
    console.log('Form submitted');
    
    // Reset general error
    this.errorMessage = '';
    
    // Validate form
    if (!this.validateForm()) {
      console.log('Validation failed');
      return;
    }

    this.loading = true;
    console.log('Creating task:', this.task);

    this.taskService.createTask(this.task).subscribe({
      next: (response) => {
        console.log('✅ Task created successfully:', response);
        this.loading = false;
        
        // Navigate and force reload
        this.router.navigate(['/tasks']).then(() => {
          console.log('Navigation completed');
          // Force page reload to refresh data
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('❌ Error creating task:', error);
        console.error('Error details:', error.status, error.message);
        this.errorMessage = 'Failed to create task. Please try again.';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }

  // Character count helper
  getTitleCharCount(): number {
    return this.task.title ? this.task.title.length : 0;
  }

  getDescriptionCharCount(): number {
    return this.task.description ? this.task.description.length : 0;
  }
}