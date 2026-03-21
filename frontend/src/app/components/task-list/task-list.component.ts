// src/app/components/task-list/task-list.component.ts

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'ALL';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isFirstLoad: boolean = true;

  statusOptions = [
    { value: 'ALL', label: 'All Tasks' },
    { value: 'TO_DO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE', label: 'Done' }
  ];

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // ✅ LOAD TASKS
  loadTasks(): void {
    if (!this.isFirstLoad) {
      this.loading = true;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log('Tasks received from backend:', data);
        console.log('Tasks length:', data.length);

        this.tasks = data;
        this.applyFilter();

        this.loading = false;
        this.isFirstLoad = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage =
          'Failed to load tasks. Make sure your backend is running on http://localhost:8080';

        this.loading = false;
        this.isFirstLoad = false;

        console.error('Error loading tasks:', error);
        this.cdr.detectChanges();
      }
    });
  }

  // ✅ NAVIGATE TO ADD TASK FORM
  addTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  // ✅ NAVIGATE TO EDIT TASK FORM
  editTask(id: string | undefined): void {
    if (id) {
      console.log('Editing task with ID:', id);
      this.router.navigate(['/tasks/edit', id]);
    }
  }

  // ✅ DELETE TASK
  deleteTask(id: string | undefined): void {
    if (!id) return;

    // Show confirmation dialog
    const confirmed = confirm('Are you sure you want to delete this task?');
    
    if (!confirmed) {
      return;
    }

    console.log('Deleting task with ID:', id);

    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('✅ Task deleted successfully. Backend response:', response);
        
        this.successMessage = 'Task deleted successfully!';
        
        // Reload tasks after deletion
        this.loadTasks();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      },
      error: (error) => {
        console.error('❌ Error deleting task:', error);
        this.errorMessage = 'Failed to delete task. Please try again.';
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      }
    });
  }

  // ✅ FILTER TRIGGER
  filterTasks(): void {
    this.applyFilter();
  }

  // ✅ FILTER LOGIC
  private applyFilter(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.status === this.selectedStatus
      );
    }

    console.log('Filtered tasks:', this.filteredTasks);
    console.log('Selected status:', this.selectedStatus);
  }

  // ✅ STATUS CSS
  getStatusClass(status: string): string {
    switch (status) {
      case 'TO_DO':
        return 'status-todo';
      case 'IN_PROGRESS':
        return 'status-inprogress';
      case 'DONE':
        return 'status-done';
      default:
        return '';
    }
  }
}