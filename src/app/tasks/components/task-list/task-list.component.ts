import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from '../../services';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;

  private router = inject(Router);
  private taskPromiseService = inject(TaskPromiseService);

  ngOnInit(): void {
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    this.updateTask(task).catch(err => console.log(err));
  }

  private async updateTask(task: TaskModel) {
    const updatedTask = await this.taskPromiseService.updateTask({
      ...task,
      done: true
    });

    const tasks: TaskModel[] = await this.tasks;
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    tasks[index] = { ...updatedTask };
}


  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onCreateTask(): void{
    const link = ['/add'];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel): void {
    this.taskPromiseService
      .deleteTask(task)
      .then(() => (this.tasks = this.taskPromiseService.getTasks()))
      .catch(err => console.log(err));
  }

}
