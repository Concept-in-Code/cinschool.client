import { Injectable } from '@angular/core';
import { Maybe } from 'common/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonPasswordService {

  private strength = new BehaviorSubject<Maybe<number>>(undefined);

  private minEntropy = new BehaviorSubject<number>(40);

  public passwordStrength(): Observable<Maybe<number>> {
    return this.strength.asObservable();
  }

  public resetPasswordStrength(): void {
    this.strength.next(undefined);
  }

  public setMinEntropy(minEntropy: number) {
    this.minEntropy.next(minEntropy);
  }

  public isValid(
    value: string,
  ): Observable<boolean> {
    return this.minEntropy.asObservable()
      .pipe(
        map(minEntropy => this.calculateEntropy(value) / minEntropy),
        tap(strengthRate => this.strength.next(strengthRate)),
        map(strengthRate => strengthRate > 1),
      );
  }

  //TODO: Use zxcvbn
  private calculateEntropy(password: string): number {
    const possibleCombinations = Math.pow(this.getCharacterSpaceSize(password), password.length);
    return Math.log(possibleCombinations) / Math.log(2) + 1e-10;
  }
  
  private getCharacterSpaceSize(password: string): number {
    let characterSpaceSize = 0;
  
    if (/[a-z]/.test(password)) {
      characterSpaceSize += 26;
    }
    if (/[A-Z]/.test(password)) {
      characterSpaceSize += 26;
    }
    if (/\d/.test(password)) {
      characterSpaceSize += 10;
    }
    if (/\W/.test(password)) {
      characterSpaceSize += 40;
    }
  
    return characterSpaceSize;
  }
}