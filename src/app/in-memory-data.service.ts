import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {TaskNote} from "./models/taskNote";
import {TaskComment} from "./models/taskComment";
import {TASKS, COMMENTS} from "./mock-data";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {tasks: TASKS, comments: COMMENTS};
  }

  genId<T extends TaskNote | TaskComment>(table: T[]): number {
    return table.length > 0 ? Math.max(...table.map(obj => obj.id)) + 1 : 1;
  }
}
