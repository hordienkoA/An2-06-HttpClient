import {
  Component,
  DestroyRef,
  inject,
  Input,
  type OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY, type Observable, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;

  @Input() editedUserID!: string;

  private userArrayService = inject(UserArrayService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private editedUser!: UserModel;

  ngOnInit(): void {
    this.users$ = this.userArrayService.users$.pipe(
      catchError((err) => {
        console.log(err);
        return EMPTY;
      })
    );

    // listen to editedUserID => editedUser from UserFormComponent
    const observer = {
      next: (user: UserModel) => {
        this.editedUser = { ...user };
        console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
      },
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete listening to editedUser')
    };

    this.userArrayService
      .getUser(this.editedUserID)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(observer);
  }

  onEditUser({ id }: UserModel): void {
    const link = ['/users/edit', id];
    this.router.navigate(link);
    // or
    // const link = ['edit', id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited({ id }: UserModel): boolean {
    if (this.editedUser) {
      return id === this.editedUser.id;
    }
    return false;
  }

  trackByFn(index: number, user: UserModel): number | null {
    return user.id;
  }
}
