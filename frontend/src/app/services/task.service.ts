// src/app/services/task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  // Get all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Get task by ID - ID is string now
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Create new task - returns string from backend
  createTask(task: Task): Observable<string> {
    return this.http.post<string>(this.apiUrl, task, {
      responseType: 'text' as 'json'
    });
  }

  // Update existing task - returns string from backend, ID is string
  updateTask(id: string, task: Task): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, task, {
      responseType: 'text' as 'json'
    });
  }
}