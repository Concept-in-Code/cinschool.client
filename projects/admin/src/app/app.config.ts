import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { commonProvideApi } from 'common/api';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,  withInMemoryScrolling({
      scrollPositionRestoration: 'top'
    })),
    provideAnimationsAsync(),
    commonProvideApi(environment),
  ]
};
