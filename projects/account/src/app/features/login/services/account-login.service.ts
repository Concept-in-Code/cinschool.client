import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountLoginUser } from '../typings/account-login-user';

@Injectable()
export class AccountLoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public register(user: AccountLoginUser): Observable<unknown> {
    return this.http
      .post('/users/login', { user })
      .pipe(
        tap(() => window.location.href = environment.adminUrl)
      );
  }

}