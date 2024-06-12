import { SortDirection } from '@angular/material/sort';
import { Maybe } from 'common/core';

export type CommonSort = {
  dir?: Maybe<SortDirection>,
  sort?: Maybe<string>,
}

export type CommonPaginate = {
  page?: Maybe<number>,
  size?: Maybe<number>,
}

export interface CommonSortPaginate extends CommonSort, CommonPaginate { }

export type CommonSortOption = {
  field: string,
  label: string,
  dir?: SortDirection,
}
