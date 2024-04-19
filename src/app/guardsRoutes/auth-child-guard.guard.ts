import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isIdNumber = !isNaN(Number(childRoute.paramMap.get('id')));
  if (!isLoggedIn || !isIdNumber) {
    if (state.url !== '/login') {
      router.navigate(['/login']);
    }
    return false;
  }
  return true;
};
