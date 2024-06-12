import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT, Environment } from 'common/core';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const environment: Environment = inject(ENVIRONMENT);
  return next(
    request.clone({ url: `${environment.apiUrl}${request.url}` })
  );
}
