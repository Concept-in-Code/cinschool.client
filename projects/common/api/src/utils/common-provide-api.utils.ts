import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ENVIRONMENT, Environment } from 'common/core';
import { apiInterceptor } from '../interceptors/api.interceptor';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';

export const commonProvideApi = (environment: Environment): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide:  ENVIRONMENT,
      useValue: environment
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([
        apiInterceptor,
        authInterceptor,
        errorInterceptor
      ])
    ),
  ]);
