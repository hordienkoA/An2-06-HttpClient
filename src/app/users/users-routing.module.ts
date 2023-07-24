import { NgModule } from '@angular/core';
import { type Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent, UserFormComponent } from './components';
import { canDeactivateGuard } from './../core';
import { userResolver, editUserPageTitleResolver } from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: 'edit/:userID',
        component: UserFormComponent,
        title: editUserPageTitleResolver,
        canDeactivate: [canDeactivateGuard],
        resolve: {
          userFromResolver: userResolver
        }
      },
      {
        path: '',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  static components = [UsersComponent, UserListComponent, UserFormComponent];
}
