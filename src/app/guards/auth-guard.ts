import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardFn: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = sessionStorage.getItem('user');

  if (user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

