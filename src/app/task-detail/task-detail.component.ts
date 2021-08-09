import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {TaskNote} from "../types/taskNote";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task?: TaskNote;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTask(taskId).subscribe(task => this.task = task );
  }

  goBack(): void {
    this.location.back();
  }
}
