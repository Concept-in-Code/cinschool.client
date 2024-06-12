import { Maybe } from 'common/core';

export type ArticleFormInput = {
  title: string;
  description?: Maybe<string>;
  body: string;
  tagList?: Maybe<string[]>;
};
