import { Routes } from '@angular/router';
import { articleUrl, slug } from '../../core/constants/admin-url.constants';

export const adminArticleRoutes: Routes = [
  {
    path: articleUrl,
    loadComponent: () => import('./components/overview/admin-article-overview.component')
      .then(mod => mod.AdminArticleOverviewComponent),
  },
  {
    path: `${articleUrl}/form`,
    loadComponent: () => import('./components/form/admin-article-form.component')
      .then(mod => mod.AdminArticleFormComponent),
  },
  {
    path: `${articleUrl}/:${slug}/form`,
    loadComponent: () => import('./components/form/admin-article-form.component')
      .then(mod => mod.AdminArticleFormComponent),
  }
];
