import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TaskNote, TaskStatus} from "../types/taskNote";
import {TaskService} from "../services/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    startDate: [],
    status: [undefined, Validators.required],
  });

  statusValues: TaskStatus[] = [
    TaskStatus.Pending,
    TaskStatus.InProgress,
    TaskStatus.Done,
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    let toSave = {
      ...this.taskForm.value,
      create: new Date(),
    }

    this.taskService.addTask(toSave as TaskNote).subscribe();
    this.router.navigateByUrl('/tasks');
  }
}
