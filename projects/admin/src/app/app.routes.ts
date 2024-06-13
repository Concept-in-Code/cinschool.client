import { Routes } from '@angular/router';
import { isAuthenticated } from './core/utils/admin-authenticated.utils';
import { adminArticleRoutes } from './features/article/admin-article.routes';
import { adminLandingRoutes } from './features/landing/admin-landing.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticated],
    children: [
      ...adminLandingRoutes,
      ...adminArticleRoutes,
    ]
  }
];
