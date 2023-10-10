import { Component, inject, Input, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from '../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task!: TaskModel;

  @Input() taskID!: string | undefined; // pathParam

  private router = inject(Router);
  private taskPromiseService = inject(TaskPromiseService);

  ngOnInit(): void {
    this.task = new TaskModel();

    if(this.taskID){
      this.taskPromiseService
      .getTask(this.taskID)
      .then((task)=>{
        this.task = task?? ({} as TaskModel);
      })
    }
    else{
      this.task = new TaskModel();
    }
  }

  onSaveTask(): void {
    const task = { ...this.task } as TaskModel;

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));

  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
