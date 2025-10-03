import { CanMatchFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService, Role } from '../../features/auth/auth.service';

export function roleGuard(required: Role): CanMatchFn {
  return () => {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) return true;
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.hasRole(required) ? true : router.createUrlTree(['/']);
  };
}
