import {TaskComment} from "./taskComment";

export enum TaskStatus {
  Done,
  InProgress,
  Pending,
  Abort,
  Deleted,
}

export interface TaskNote {
  id: number;
  title: string;
  description: string;
  commentIds: number[];
  status: TaskStatus;
  created: Date;
  started?: Date;
  finished?: Date;
}
