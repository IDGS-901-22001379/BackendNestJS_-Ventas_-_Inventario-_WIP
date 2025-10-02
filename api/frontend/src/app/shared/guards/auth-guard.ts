import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    const router = new Router();
    // Nota: en standalone, mejor redirigir con UrlTree en rutas (ver app.routes.ts).
    return false;
  }
  return true;
};
