import { Routes } from '@angular/router';
import { articleUrl } from './constants/admin-article.constants';

export const adminArticleRoutes: Routes = [
  {
    path: articleUrl,
    loadComponent: () => import('./components/overview/admin-article-overview.component')
      .then(mod => mod.AdminArticleOverviewComponent),
  }
];
