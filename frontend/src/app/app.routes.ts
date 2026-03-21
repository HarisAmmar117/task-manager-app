// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks/new', component: TaskFormComponent },       // Create new task
  { path: 'tasks/edit/:id', component: TaskFormComponent },  // Edit existing task
  { path: 'tasks', component: TaskListComponent },           // List all tasks
  { path: '**', redirectTo: '/tasks' }
];