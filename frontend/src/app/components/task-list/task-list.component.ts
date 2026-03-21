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
    private router: Router  // ← Added Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // ✅ LOAD TASKS (FIXED)
  loadTasks(): void {
    if (!this.isFirstLoad) {
      this.loading = true;
    }

    this.errorMessage = '';

    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log('Tasks received from backend:', data);
        console.log('Tasks length:', data.length);

        this.tasks = data;

        // ✅ Always apply filter
        this.applyFilter();

        this.loading = false;
        this.isFirstLoad = false;

        // ✅ FORCE UI UPDATE (MAIN FIX)
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage =
          'Failed to load tasks. Make sure your backend is running on http://localhost:8080';

        this.loading = false;
        this.isFirstLoad = false;

        console.error('Error loading tasks:', error);
      }
    });
  }

  // ✅ NAVIGATE TO ADD TASK FORM
  addTask(): void {
    this.router.navigate(['/tasks/new']);
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