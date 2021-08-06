import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {TaskNote} from "../types/taskNote";
import {TaskService} from "../services/task.service";
import {TaskComment} from "../types/taskComment";
import {CommentService} from "../services/comment.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task?: TaskNote;
  comments: TaskComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private commentService: CommentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTask(taskId).subscribe(task => this.task = task );
    this.commentService.getComments(taskId).subscribe(comments => this.comments = comments);
  }

  goBack(): void {
    this.location.back();
  }

  deleteComment(comment: TaskComment): void {
    this.comments = this.comments.filter(c => c !== comment);
    this.commentService.deleteComment(comment.id).subscribe();
  }
}
