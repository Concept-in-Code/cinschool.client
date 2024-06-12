import { Maybe } from 'common/core';

export type ArticleSave = {
  slug?: Maybe<string>,
  title: string;
  description?: Maybe<string>;
  body: string;
  tagList?: Maybe<string[]>;
};
