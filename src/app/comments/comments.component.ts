import { Component, OnInit } from '@angular/core';
import {TaskComment} from "../types/taskComment";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../services/comment.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: TaskComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const taskId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.commentService.getComments(taskId).subscribe(comments => this.comments = comments);
  }

  addComment(comment: TaskComment) {
    this.commentService.addComment(comment).subscribe(newComment => {
      this.comments.push(newComment);
    });
  }
}
