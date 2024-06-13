import { Routes } from '@angular/router';

export const adminLandingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/admin-article-landing.component')
      .then(mod => mod.AdminArticleLandingComponent),
  }
];
