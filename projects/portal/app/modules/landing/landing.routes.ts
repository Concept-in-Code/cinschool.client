import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing.component')
      .then(mod => mod.LandingComponent),
  }
];
