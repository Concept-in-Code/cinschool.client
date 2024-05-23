import { Maybe } from 'common/core';
import { CommonButtonType } from './common-button-type';

export interface CommonButton {
  disabled: boolean;
  type?: Maybe<CommonButtonType>;
}

export type CommonButtonClass<T extends CommonButton> = new (...args: unknown[]) => T;