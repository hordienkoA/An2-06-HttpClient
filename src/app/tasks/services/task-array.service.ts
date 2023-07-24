import { Injectable } from '@angular/core';
import { TaskModel } from './../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskArrayService {
  private taskList = [
    new TaskModel(1, 'Estimate', 1, 8, 8, true),
    new TaskModel(2, 'Create', 2, 8, 4, false),
    new TaskModel(3, 'Deploy', 3, 8, 0, false)
  ];

  getTasks(): Promise<TaskModel[]> {
    return Promise.resolve(this.taskList);;
  }

  getTask(id: NonNullable<TaskModel['id']> | string): Promise<TaskModel | undefined> {
    return this.getTasks()
      .then(tasks => tasks.find(task => task.id === +id))
      .catch(() => Promise.reject('Error in getTask method'));
  }

  createTask(task: TaskModel): void {
    this.taskList.push(task);
  }

  updateTask(task: TaskModel): void {
    const i = this.taskList.findIndex(t => t.id === task.id);

    if (i > -1) {
      this.taskList.splice(i, 1, task);
    }
  }

  deleteTask(task: TaskModel): void {
    const i = this.taskList.findIndex(t => t.id === task.id);

    if (i > -1) {
      this.taskList.splice(i, 1);
    }
  }
}
