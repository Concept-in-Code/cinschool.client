import { Routes } from '@angular/router';
import { loginRoutes } from './modules/login/account-login.routes';
import { registerRoutes } from './modules/register/account-register.routes';

export const routes: Routes = [
  ...loginRoutes,
  ...registerRoutes,
];
