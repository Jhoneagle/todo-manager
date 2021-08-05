import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import {TaskNote} from "../models/taskNote";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTasks(): Observable<TaskNote[]> {
    return this.http.get<TaskNote[]>(this.tasksUrl)
    .pipe(
      catchError(this.handleError<TaskNote[]>('getTasks', []))
    );
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<TaskNote> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<TaskNote>(url).pipe(
      catchError(this.handleError<TaskNote>(`getTask id=${id}`))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: TaskNote): Observable<TaskNote> {
    return this.http.post<TaskNote>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newtask: TaskNote) => this.log(`added task w/ title ${task.title}`)),
      catchError(this.handleError<TaskNote>('addTask'))
    );
  }

  /** PUT: update the task on the server */
  updateTask(task: TaskNote): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task ${task.title}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask(id: number): Observable<TaskNote> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<TaskNote>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<TaskNote>('deleteTask'))
    );
  }

  /** Log a taskService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`taskService: ${message}`);
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
