import { HttpErrorResponse } from '@angular/common/http';
import { Maybe } from 'common/core';
import { CommonHttpErrorBody } from './common-http-error-body';

export interface CommonHttpErrorResponse extends HttpErrorResponse {
  error: Maybe<CommonHttpErrorBody>
}