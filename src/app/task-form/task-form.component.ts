import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TaskStatus} from "../types/taskNote";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: [undefined, Validators.required],
  });

  statusValues: TaskStatus[] = [
    TaskStatus.Pending,
    TaskStatus.InProgress,
    TaskStatus.Done,
    TaskStatus.Abort
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.taskForm.value);
  }
}
