import { Routes, CanMatchFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout';

// canMatch seguro para SSR
const requireAuth: CanMatchFn = () => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);
  if (!isBrowser) return true; // en SSR no bloqueamos

  const hasToken =
    typeof localStorage !== 'undefined' && !!localStorage.getItem('token');

  return hasToken ? true : inject(Router).createUrlTree(['/auth/login']);
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register').then(
            (m) => m.Register
          ),
      },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/products/pages/products-list/products-list'
              ).then((m) => m.ProductsList),
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './features/products/pages/product-form/product-form'
              ).then((m) => m.ProductForm),
            canMatch: [requireAuth],
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './features/products/pages/product-detail/product-detail'
              ).then((m) => m.ProductDetail),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import(
                './features/products/pages/product-form/product-form'
              ).then((m) => m.ProductForm),
            canMatch: [requireAuth],
          },
        ],
      },

      {
        path: 'users',
        canMatch: [requireAuth],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/users/pages/users-list/users-list').then(
                (m) => m.UsersListComponent
              ),
          },
          {
            path: 'me',
            loadComponent: () =>
              import(
                './features/users/pages/user-profile/user-profile'
              ).then((m) => m.UserProfileComponent),
          },
        ],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
