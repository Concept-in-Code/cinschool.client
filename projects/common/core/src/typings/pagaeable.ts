import { Maybe } from './maybe';

export type Pageable<T> = {
  result: Maybe<T[]>;
  count: Maybe<number>;
}
