import { Routes } from '@angular/router';
import { loginRoutes } from './features/login/account-login.routes';
import { registerRoutes } from './features/register/account-register.routes';

export const routes: Routes = [
  ...loginRoutes,
  ...registerRoutes,
];
