import { Maybe } from 'common/core';
import { CommonButtonLayout } from './common-button-style';
import { CommonButtonType } from './common-button-type';

export interface CommonButton {
  disabled: boolean;
  layout?: Maybe<CommonButtonLayout> 
  type?: Maybe<CommonButtonType>;
}

export type CommonButtonClass<T extends CommonButton> = new (...args: unknown[]) => T;