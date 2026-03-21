// src/app/components/task-list/task-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  // ← This is CRITICAL!
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'ALL';
  loading: boolean = false;
  errorMessage: string = '';
  
  // Status options for filtering
  statusOptions = [
    { value: 'ALL', label: 'All Tasks' },
    { value: 'TO_DO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE', label: 'Done' }
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load all tasks from backend
  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
        this.loading = false;
        console.log('Tasks loaded:', data);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load tasks. Make sure your backend is running on http://localhost:8080';
        this.loading = false;
        console.error('Error loading tasks:', error);
      }
    });
  }

  // Filter tasks by status
  filterTasks(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }

  // Get CSS class based on status
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