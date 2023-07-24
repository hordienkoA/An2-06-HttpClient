import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from '@angular/router';

import { AuthService } from "../services/auth.service";

export const canActivateChildAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { url } = state;

  console.log('CanActivateChild Guard is called');
  return authService.checkLogin(url)
    ? true
    : router.parseUrl('/login');
};
