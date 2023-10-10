import { Component, type OnInit, inject, Input, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, type UrlTree } from '@angular/router';
import type { Observable, Subscription } from 'rxjs';
import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';
import { DialogService } from './../../../core';
import type { CanComponentDeactivate } from './../../../core';
import { UserObservableService } from '../../services';
import { Location } from '@angular/common';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;
  originalUser!: UserModel;

  @Input({ required: true }) userFromResolver: UserModel = new UserModel(null, '', '');

  private router = inject(Router);
  private dialogService = inject(DialogService);
  private onGoBackClick: boolean = false;
  private userObservableService = inject(UserObservableService);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);
  private sub!: Subscription;
  ngOnInit(): void {
    this.user = {...this.userFromResolver};
    this.originalUser = { ...this.userFromResolver };
  }

  onSaveUser(): void {
    const user = { ...this.user };
    const method = user.id ? 'updateUser' : 'createUser';

    const observer = {
      next: (savedUser: UserModel) => {
        this.originalUser = { ...savedUser };
        user.id
          ? // optional parameter: http://localhost:4200/users;editedUserID=2
            this.router.navigate(['users', { editedUserID: user.id }])
          : this.onGoBack();
      },
      error: (err: any) => console.log(err)
};
this.sub = this.userObservableService[method](user).subscribe(observer);

  }

  onGoBack(): void {
    this.onGoBackClick = true;
    //this.router.navigate(['./../../'], { relativeTo: this.route });
    this.location.back()
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.onGoBackClick) return true;

    const flags = (Object.keys(this.originalUser) as (keyof UserModel)[]).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
