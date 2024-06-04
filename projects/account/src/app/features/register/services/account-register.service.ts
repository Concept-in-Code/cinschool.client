import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonFeedbackService } from 'common/feedback';
import { Observable, tap } from 'rxjs';
import { AccountRegisterUser } from '../typings/account-register-user';

@Injectable()
export class AccountRegisterService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private feedbackService: CommonFeedbackService,
  ) { }

  public register(user: AccountRegisterUser): Observable<unknown> {
    return this.http
      .post('/users', { user })
      .pipe(
        tap(() => this.router.navigate([''])),
        tap(() => this.feedbackService.open({
          type: 'success',
          message: 'Vielen Dank für deine Registrierung!',
          action: 'Bitte logge dich ein'
        }))
      );
  }

}