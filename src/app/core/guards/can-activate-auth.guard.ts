import { inject } from '@angular/core';
import { CanActivateFn, Router, NavigationExtras } from '@angular/router';
import { AuthService } from './../services/auth.service';

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { url } = state;

  console.log('CanActivate Guard is called');

  // Create a dummy session id
  const sessionId = 123456789;
  const navigationExtras: NavigationExtras = {
    queryParams: { sessionId },
    fragment: 'anchor'
  };

  if (authService.checkLogin(url)) {
    return true;
  } else {
    router.navigate(['/login'], navigationExtras);
    return false;
  }

};
