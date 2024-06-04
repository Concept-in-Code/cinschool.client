import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ENVIRONMENT } from '../constants/environment.constants';
import { apiInterceptor } from '../interceptors/api.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { Environment } from '../typings/environment';

export const provideCore = (environment: Environment): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide:  ENVIRONMENT,
      useValue: environment
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([
        apiInterceptor,
        errorInterceptor
      ])
    ),
  ]);