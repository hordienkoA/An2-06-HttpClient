import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent, TaskFormComponent, TaskListComponent } from './components';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent],
  imports: [CommonModule, FormsModule, TasksRoutingModule, TaskComponent],
  providers: [],
})
export class TasksModule {}
