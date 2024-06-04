import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '../constants/environment.constants';
import { Environment } from '../typings/environment';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const environment: Environment = inject(ENVIRONMENT);
  return next(
    request.clone({ url: environment.apiUrl })
  );
}