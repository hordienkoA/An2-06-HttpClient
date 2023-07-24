import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent, UserFormComponent, UserListComponent } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, UsersRoutingModule, UserComponent],
  declarations: [UsersRoutingModule.components]
})
export class UsersModule {}
