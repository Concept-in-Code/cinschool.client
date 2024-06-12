import { Maybe } from 'common/core';

export type CommonRowCustomAction<T> = {
  callback?: (row: Maybe<T>) => void,
  disable?: (row: Maybe<T>) => boolean,
  icon: string,
};

export type CommonRowActionComponentInput = {
  component: any,
  inputs?: {
    [key: string]: any;
  }
};

export type CommonRowActionComponent<T> = (row: T) => CommonRowActionComponentInput

export type CommonRowAction<T> = CommonRowCustomAction<T> | CommonRowActionComponent<T>;
