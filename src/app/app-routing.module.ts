import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {TaskFormComponent} from "./task-form/task-form.component";

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'newTask', component: TaskFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
