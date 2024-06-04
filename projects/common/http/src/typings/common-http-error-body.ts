import { CommonHttpValidationError } from './common-http-validation-error';

export interface CommonHttpErrorBody {
  type: string;
  title: string;
  status: number;
  errors: CommonHttpValidationError;
  traceId: string;
}