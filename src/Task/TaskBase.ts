import { InfoUpdateManager } from "../ErrorManager";

export enum TaskStatus {
  Prepare = 0,//"准备中",
  Doing = 1,//"进行中",
  Success = 2,//"完成",
  Fail = 3,//"失败"
}

export interface Task {
  status: TaskStatus;
  name: String;
  date: Date;
  do(): Promise<TaskStatus>;
}

export interface TaskQueue {
  list: Array<Task>;
  do(): Promise<TaskStatus>;
}

export class TaskBase implements Task {
  status: TaskStatus;
  name: String;
  date: Date;
  do(): Promise<TaskStatus> {
    throw new Error("Method not implemented.");
  }
  updateInfo(error: Error, info: any = null) {
    InfoUpdateManager.update(error, {
      name: this.name,
      status: this.status,
      date: this.date,
      info: (info || {})
    })
  }
}