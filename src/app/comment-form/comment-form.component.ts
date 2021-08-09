import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TaskComment} from "../types/taskComment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Output() addComment = new EventEmitter<TaskComment>();

  commentForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const taskId: number = Number(this.route.snapshot.paramMap.get('id'));

    let toSave = {
      ...this.commentForm.value,
      created: new Date(),
      taskId
    }

    this.addComment.emit(toSave as TaskComment);
    this.commentForm.reset();
  }
}
