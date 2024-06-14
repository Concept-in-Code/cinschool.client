import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT, Environment, Maybe, User } from 'common/core';
import { Observable, tap } from 'rxjs';
import { jwtToken } from '../constants/common-api.constants';
import { CommonLoginUser } from '../typings/common-login-user';
import { CommonLoginTokenPayload } from '../typings/common-login-token-payload';

@Injectable({ providedIn: 'root'})
export class CommonAuthService {

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT)
    private environment: Environment
  ) { }

  public get isAuthenticated(): boolean {
    if(!this.tokenPaylod) return false;
    return this.tokenPaylod.exp * 1000 > new Date().getTime()
  }

  public get token(): Maybe<string> {
    return localStorage.getItem(jwtToken);
  }

  private get tokenPaylod(): Maybe<CommonLoginTokenPayload> {
    if(!this.token) return undefined

    return JSON.parse(atob(this.token.split('.')[1]))
  }

  public login(user: CommonLoginUser): Observable<unknown> {
    return this.http
      .post<{user: User}>('/users/login', { user })
      .pipe(
        tap(response => this.store(response.user)),
        tap(() => window.location.href = this.environment.adminUrl),
      );
  }

  private store(user: User): void {
    user?.token
      && localStorage.setItem(jwtToken, user.token);
  }

}
