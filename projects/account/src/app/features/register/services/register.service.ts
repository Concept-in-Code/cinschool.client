import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'common/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RegisterService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<{ user: User }> {
    return this.http
      .post<{ user: User }>('/users', { user })
      .pipe(
        tap(() => this.router.navigate(['']))
      );
  }

}