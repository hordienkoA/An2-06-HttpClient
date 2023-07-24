import { Component, type OnInit, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, type UrlTree } from '@angular/router';
import type { Observable } from 'rxjs';
import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';
import { DialogService } from './../../../core';
import type { CanComponentDeactivate } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;
  originalUser!: UserModel;

  @Input({ required: true }) userFromResolver: UserModel = new UserModel(null, '', '');

  private userArrayService = inject(UserArrayService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(DialogService);
  private onGoBackClick: boolean = false;

  ngOnInit(): void {
    this.user = {...this.userFromResolver};
    this.originalUser = { ...this.userFromResolver };
  }

  onSaveUser(): void {
    const user = { ...this.user };
    const method = user.id ? 'updateUser' : 'createUser';

    this.userArrayService[method](user);

    if (user.id) {
      this.router.navigate(['/users', {editedUserID: user.id}]);
    } else {
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.onGoBackClick = true;
    this.router.navigate(['./../../'], { relativeTo: this.route });
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
