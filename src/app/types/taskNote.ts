export enum TaskStatus {
  Done= "Done",
  InProgress = "In progress",
  Pending = "Pending",
  Abort = "Aborted",
}

export interface TaskNote {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created: Date;
  startDate?: Date;
  endDate?: Date;
}
