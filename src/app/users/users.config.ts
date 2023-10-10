import { InjectionToken } from '@angular/core';

export const UsersAPI = new InjectionToken<string>('UsersAPI', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/users'
});
