import { Injectable } from '@angular/core';
import {  of, delay, tap, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;

  // store the URL so we can redirect after logging in
  redirectUrl!: string;

  login(isAdmin: boolean = false): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = val;
        this.isAdmin = isAdmin;
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.redirectUrl = url;

    // Navigate to the login, return false
    return false;
  }
}
