import { Component, OnInit } from '@angular/core';
import {TaskNote} from "../types/taskNote";
import {TaskService} from "../services/task.service";
import {CommentService} from "../services/comment.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: TaskNote[] = [];

  constructor(
    private heroService: TaskService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.heroService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  delete(tasks: TaskNote): void {
    this.tasks = this.tasks.filter(t => t !== tasks);

    this.commentService.getComments(tasks.id).subscribe(comments => {
      comments.forEach(c => {
        this.commentService.deleteComment(c.id).subscribe();
      })

      this.heroService.deleteTask(tasks.id).subscribe();
    });
  }
}
