import { TaskQueue, Task, TaskStatus } from "./TaskBase";
import { InfoUpdateManager } from "../ErrorManager";

export class InitTaskQueue implements TaskQueue {
  list: Task[] = new Array<Task>();
  constructor(...tasks: Task[]) {
    tasks && this.addTasks(tasks);
  }
  addTasks(tasks: Task[]) {
    this.list.push(...tasks);
  }
  updateInfo(error: Error, info: any = null) {
    InfoUpdateManager.update(error, info)
  }
  async do(): Promise<TaskStatus> {
    try {
      for (const task of this.list) {
        await task.do();
      }
    } catch (error) {
      this.updateInfo(error)
    }
    return TaskStatus.Success;
  }
}