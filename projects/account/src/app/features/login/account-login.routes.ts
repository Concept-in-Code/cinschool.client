import { Routes } from '@angular/router';

export const loginRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/account-login.component')
      .then(mod => mod.AccountLoginComponent),
  }
];
