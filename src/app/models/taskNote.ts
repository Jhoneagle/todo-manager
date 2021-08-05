export enum TaskStatus {
  Done,
  InProgress,
  Pending,
  Abort,
}

export interface TaskNote {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created: Date;
  started?: Date;
  finished?: Date;
}
