import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Environment } from '../../../core/src/typings/environment';
import { ENVIRONMENT } from '../constants/environment.constants';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const environment: Environment = inject(ENVIRONMENT);
  return next(
    request.clone({ url: `${environment.apiUrl}${request.url}` })
  );
}