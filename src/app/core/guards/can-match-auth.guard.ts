import { inject } from '@angular/core';
import type { Route, UrlSegment, UrlTree } from '@angular/router';
import { type Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

export function canMatchAuthGuard(route: Route, segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const authService = inject(AuthService);
  const url = `/${route.path}`;

  console.log('CanMatch Guard is called');
  return authService.checkLogin(url);
}
