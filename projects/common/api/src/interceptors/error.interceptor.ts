import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonFeedback, CommonFeedbackService } from 'common/feedback';
import { EMPTY, catchError } from 'rxjs';
import { CommonHttpErrorResponse } from '../typings/common-http-error-response';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const feedbackService: CommonFeedbackService = inject(CommonFeedbackService);
  return next(request).pipe(
    catchError((response: CommonHttpErrorResponse) => {
      feedbackService.open(
        createFeedback(response)
      );
      return EMPTY;
    }),
  );
}

const createFeedback = (response: CommonHttpErrorResponse): CommonFeedback => {
  switch(response.status) {
    case 400:
    case 422:
      return {
        type: 'error',
        message: response.error?.title,
        action: 'Bitte erneut versuchen',
        variables: response.error?.errors
          ? new Map(Object.entries(response.error.errors).map(([key, value]) => [key, value.join(', ')]))
          : new Map()
      };
    default:
      return {
        type: 'critical',
        message: 'Schwerwiegender Fehler',
        action: 'Bitte Support um Hilfe bitten',
        variables: new Map([
          ['Fehlermeldung', response.message],
        ])
      };
  }
}

