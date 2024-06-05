import { InjectionToken } from '@angular/core';
import { Environment } from '../typings/environment';

export const ENVIRONMENT = new InjectionToken<Environment>('env');