import { inject } from '@angular/core';
import { CommonAuthService } from 'common/api';
import { CommonFeedbackService } from 'common/feedback';
import { environment } from '../../../environments/environment';

export const isAuthenticated = (): boolean => {
  const authService = inject(CommonAuthService);

  if (authService.isAuthenticated) {
    const feedbackService = inject(CommonFeedbackService);
    feedbackService.open({
      type: 'success',
      message: 'Willkommen zurück!'
    })

    return true;
  }

  window.location.href = environment.accountUrl;
  return false;
}