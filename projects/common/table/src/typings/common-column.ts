import { Maybe, TypePath } from 'common/core';
import { Observable } from 'rxjs';
import { CommonColumnType } from './common-column-type';

export type CommonColumn<T> = {
  field: TypePath<T>,
  label?: string,
  sort?: boolean,
  type?: CommonColumnType,
  value?: ((row: T) => Observable<Maybe<string>> | Maybe<string>),
};
