import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import type { UserModel } from './../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input({ required: true }) user!: UserModel;

  @Output() editUser = new EventEmitter<UserModel>();

  onEditUser(): void {
    this.editUser.emit(this.user);
  }
}
