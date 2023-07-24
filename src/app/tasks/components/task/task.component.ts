import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input({ required: true}) task!: TaskModel;

  @Output() completeTask = new EventEmitter<TaskModel>();
  @Output() editTask = new EventEmitter<TaskModel>();

  onCompleteTask(): void {
    this.completeTask.emit(this.task);
  }

  onEditTask(): void {
    this.editTask.emit(this.task);
  }

}
