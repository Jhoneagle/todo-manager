import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import {TaskComment} from "../models/taskComment";

@Injectable({
  providedIn: 'root'
})
export class commentService {
  private commentsUrl = 'api/comments';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getComments(): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(this.commentsUrl)
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
      tap((newcomment: TaskComment) => this.log(`added comment w/ title ${comment.title}`)),
      catchError(this.handleError<TaskComment>('addComment'))
    );
  }

  /** PUT: update the comment on the server */
  updateComment(comment: TaskComment): Observable<any> {
    return this.http.put(this.commentsUrl, comment, this.httpOptions).pipe(
      tap(_ => this.log(`updated comment ${comment.title}`)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  /** DELETE: delete the comment from the server */
  deleteComment(id: number): Observable<TaskComment> {
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<TaskComment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted comment id=${id}`)),
      catchError(this.handleError<TaskComment>('deleteComment'))
    );
  }

  /** Log a commentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`commentService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
