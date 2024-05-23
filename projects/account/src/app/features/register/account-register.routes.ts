import { Routes } from '@angular/router';

export const registerRoutes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./components/account-register.component')
      .then(mod => mod.AccountRegisterComponent),
  }
];
