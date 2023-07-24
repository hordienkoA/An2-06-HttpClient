import { Component, inject, Input, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskModel } from './../../models/task.model';
import { TaskArrayService } from './../../services/task-array.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task!: TaskModel;

  @Input() taskID!: string; // pathParam

  private taskArrayService = inject(TaskArrayService);
  private router = inject(Router);

  ngOnInit(): void {
    this.task = new TaskModel();

    this.taskArrayService.getTask(this.taskID)
      .then(task => {
        this.task = task ?? {} as TaskModel;
      })
      .catch(err => console.log(err));
  }

  onSaveTask(): void {
    const task = { ...this.task } as TaskModel;

    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.createTask(task);
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
