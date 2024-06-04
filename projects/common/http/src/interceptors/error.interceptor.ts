import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FeedbackService } from 'common/feedback';
import { EMPTY, catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const feedbackService: FeedbackService = inject(FeedbackService);
  return next(request).pipe(
    catchError((response: HttpErrorResponse) => {
      feedbackService.open({
        type: 'critical',
        message: 'Schwerwiegender Fehler',
        action: 'Bitte Support um Hilfe bitten',
        variables: new Map([
          ['Fehlermeldung', response.message],
        ])
      });
      return EMPTY;
    }),
  );
}
