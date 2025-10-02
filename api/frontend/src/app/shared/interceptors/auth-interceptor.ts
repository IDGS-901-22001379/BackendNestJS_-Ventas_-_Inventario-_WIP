import { HttpInterceptorFn } from '@angular/common/http';
import { isBrowser } from '../../shared/utils/platform';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = isBrowser ? localStorage.getItem('token') : null;
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
