import { inject } from '@angular/core';
import { CommonAuthService } from 'common/api';
import { environment } from '../../../environments/environment';

export const isAuthenticated = (): boolean => {
  const authService = inject(CommonAuthService);

  if (authService.isAuthenticated) {
    return true;
  }

  window.location.href = environment.accountUrl;
  return false;
}