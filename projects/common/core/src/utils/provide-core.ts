import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ENVIRONMENT } from '../constants/environment.constants';
import { ApiInterceptor } from '../interceptors/api.interceptor';
import { Environment } from '../typings/environment';

export function provideCore(environment: Environment): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide:  ENVIRONMENT,
      useValue: environment
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: ApiInterceptor,
      multi: true,
      deps: [ENVIRONMENT],
    },
  ]);
}