// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '**', redirectTo: '/tasks' }
];