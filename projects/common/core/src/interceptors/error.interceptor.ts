import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { FeedbackService } from '../services/feedback.service';

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
