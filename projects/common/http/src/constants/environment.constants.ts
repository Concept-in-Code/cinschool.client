import { InjectionToken } from '@angular/core';
import { Environment } from '../../../core/src/typings/environment';

export const ENVIRONMENT = new InjectionToken<Environment>('env');