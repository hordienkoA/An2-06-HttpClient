import { NgModule } from '@angular/core';
import { type Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import {
  AdminDashboardComponent,
  ManageTasksComponent,
  ManageUsersComponent
} from './components';

import { canActivateAuthGuard, canActivateChildAuthGuard } from './../core';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [canActivateAuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [canActivateChildAuthGuard],
        children: [
          { path: 'users', component: ManageUsersComponent },
          { path: 'tasks', component: ManageTasksComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminDashboardComponent,
    ManageTasksComponent,
    ManageUsersComponent
  ];
}
