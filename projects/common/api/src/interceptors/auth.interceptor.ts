import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonAuthService } from '../services/common-auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(CommonAuthService);
  return next(
    authService.token
      ? request.clone({ headers: request.headers.set('Authorization', `Token ${authService.token}`)})
      : request
  );
}
