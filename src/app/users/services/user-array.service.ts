import { Injectable } from '@angular/core';
import { EMPTY, of, throwError, catchError, switchMap, type Observable } from 'rxjs';
import { UserModel } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserArrayService {
  private userList: Array<UserModel> = [
    new UserModel(1, 'Anna', 'Borisova'),
    new UserModel(2, 'Boris', 'Vlasov'),
    new UserModel(3, 'Gennadiy', 'Dmitriev')
  ];

  users$: Observable<UserModel[]> = of(this.userList);

  getUser(id: NonNullable<UserModel['id']> | string): Observable<UserModel> {
    return this.users$.pipe(
      switchMap((users: Array<UserModel>) => {
        const user = users.find(user => user.id === +id);
        return user ? of(user) : EMPTY;
      }),
      catchError(err => throwError(() => 'Error in getUser method'))
    );
  }

  createUser(user: UserModel): void {
    this.userList.push(user);
  }

  updateUser(user: UserModel): void {
    const i = this.userList.findIndex(u => u.id === user.id);

    if (i > -1) {
      this.userList.splice(i, 1, user);
    }
  }
}
