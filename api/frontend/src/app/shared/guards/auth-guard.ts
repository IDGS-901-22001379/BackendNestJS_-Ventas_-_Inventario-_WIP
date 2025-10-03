import { CanMatchFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanMatchFn = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return true;   // SSR: no bloquear
  const router = inject(Router);
  const hasToken = !!localStorage.getItem('token');
  return hasToken ? true : router.createUrlTree(['/auth/login']);
};
