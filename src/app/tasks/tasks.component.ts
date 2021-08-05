import { Component, OnInit } from '@angular/core';
import {TaskNote} from "../types/taskNote";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: TaskNote[] = [];

  constructor(private heroService: TaskService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.heroService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  delete(tasks: TaskNote): void {
    this.tasks = this.tasks.filter(t => t !== tasks);
    this.heroService.deleteTask(tasks.id).subscribe();
  }
}
