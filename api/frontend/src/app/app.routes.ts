import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout';
import { authGuard } from './shared/guards/auth-guard';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },

  // Público
  {
    path: 'auth',
    children: [
      { path: 'login',    loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./features/auth/pages/register/register').then(m => m.Register) },
    ],
  },

  // Layout + secciones protegidas
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'products',
        children: [
          { path: '',         loadComponent: () => import('./features/products/pages/products-list/products-list').then(m => m.ProductsList) },
          // Solo usuarios logueados pueden crear/editar
          { path: 'new',      loadComponent: () => import('./features/products/pages/product-form/product-form').then(m => m.ProductForm), canMatch: [authGuard] },
          { path: ':id',      loadComponent: () => import('./features/products/pages/product-detail/product-detail').then(m => m.ProductDetail) },
          { path: ':id/edit', loadComponent: () => import('./features/products/pages/product-form/product-form').then(m => m.ProductForm), canMatch: [authGuard] },
        ],
      },

      // Admin-only (ejemplo)
      {
        path: 'admin',
        canMatch: [authGuard, roleGuard('admin')],
        loadComponent: () => import('./features/users/pages/users-list/users-list').then(m => m.UsersListComponent),
      },

      // Perfil (requiere login)
      {
        path: 'users',
        canMatch: [authGuard],
        children: [
          { path: 'me', loadComponent: () => import('./features/users/pages/user-profile/user-profile').then(m => m.UserProfileComponent) },
        ],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
