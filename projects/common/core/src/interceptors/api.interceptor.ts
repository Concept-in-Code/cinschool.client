import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../constants/environment.constants';
import { Environment } from '../typings/environment';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject(ENVIRONMENT)
    private environment: Environment,
  ) { }

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({ url: this.environment.apiUrl })
    );
  }

}