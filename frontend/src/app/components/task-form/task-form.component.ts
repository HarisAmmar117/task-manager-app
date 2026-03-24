// src/app/components/task-form/task-form.component.ts

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: 'TO_DO'
  };

  loading: boolean = false;
  errorMessage: string = '';
  isEditMode: boolean = false;
  taskId?: string;
  
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
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // ← Added ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode = true;
      this.taskId = id;
      this.loadTask(this.taskId);
    }
  }

  // Load existing task for editing
  loadTask(id: string): void {
    console.log('Loading task with ID:', id);
    this.loading = true;
    this.errorMessage = '';
    
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        console.log('✅ Task loaded successfully:', task);
        this.task = task;
        this.loading = false;
        
        // ✅ FORCE ANGULAR TO UPDATE THE UI
        this.cdr.detectChanges();
        
        console.log('UI updated with task data');
      },
      error: (error) => {
        console.error('❌ Error loading task:', error);
        this.errorMessage = 'Failed to load task. Please try again.';
        this.loading = false;
        
        // Force UI update even on error
        this.cdr.detectChanges();
        
        // Redirect back to list after 3 seconds if task not found
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 3000);
      }
    });
  }

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

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.updateTask();
    } else {
      // Create new task
      this.createTask();
    }
  }

  createTask(): void {
    console.log('Creating task:', this.task);

    this.taskService.createTask(this.task).subscribe({
      next: (response) => {
        console.log('✅ Task created successfully. Backend response:', response);
        this.loading = false;
        
        // Navigate back to task list
        this.router.navigate(['/tasks']).then(() => {
          console.log('Navigation completed - page will reload');
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('❌ Error creating task:', error);
        this.errorMessage = 'Failed to create task. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateTask(): void {
    console.log('Updating task:', this.taskId, this.task);

    this.taskService.updateTask(this.taskId!, this.task).subscribe({
      next: (response) => {
        console.log('✅ Task updated successfully. Backend response:', response);
        this.loading = false;
        
        // Navigate back to task list
        this.router.navigate(['/tasks']).then(() => {
          console.log('Navigation completed - page will reload');
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('❌ Error updating task:', error);
        this.errorMessage = 'Failed to update task. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
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