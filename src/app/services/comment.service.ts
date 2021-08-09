import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {TaskComment} from "../types/taskComment";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = 'api/comments';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {}

  getComments(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(`${this.commentsUrl}/?taskId=${taskId}`)
    .pipe(
      catchError(this.handleError<TaskComment[]>('getComments', []))
    );
  }

  /** GET comment by id. Will 404 if id not found */
  getComment(id: number): Observable<TaskComment> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.get<TaskComment>(url).pipe(
      catchError(this.handleError<TaskComment>(`getComment id=${id}`))
    );
  }

  /** POST: add a new comment to the server */
  addComment(comment: TaskComment): Observable<TaskComment> {
    return this.http.post<TaskComment>(this.commentsUrl, comment, this.httpOptions).pipe(
      tap((newcomment: TaskComment) => this.alertService.success(`added comment w/ title ${comment.title}`)),
      catchError(this.handleError<TaskComment>('addComment'))
    );
  }

  /** PUT: update the comment on the server */
  updateComment(comment: TaskComment): Observable<any> {
    return this.http.put(this.commentsUrl, comment, this.httpOptions).pipe(
      tap(_ => this.alertService.success(`updated comment ${comment.title}`)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  /** DELETE: delete the comment from the server */
  deleteComment(id: number): Observable<TaskComment> {
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<TaskComment>(url, this.httpOptions).pipe(
      tap(_ => this.alertService.success(`deleted comment id=${id}`)),
      catchError(this.handleError<TaskComment>('deleteComment'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.alertService.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
