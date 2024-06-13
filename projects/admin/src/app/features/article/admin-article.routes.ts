import { Routes } from '@angular/router';
import { articleUrl, identifier } from '../../core/constants/admin-url.constants';

export const adminArticleRoutes: Routes = [
  {
    path: articleUrl,
    loadComponent: () => import('./overview/components/admin-article-overview.component')
      .then(mod => mod.AdminArticleOverviewComponent),
  },
  {
    path: `${articleUrl}/form`,
    loadComponent: () => import('./form/components/admin-article-form.component')
      .then(mod => mod.AdminArticleFormComponent),
  },
  {
    path: `${articleUrl}/:${identifier}/form`,
    loadComponent: () => import('./form/components/admin-article-form.component')
      .then(mod => mod.AdminArticleFormComponent),
  },
];
