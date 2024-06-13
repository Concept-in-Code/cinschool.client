import { Maybe } from 'common/core';

export enum ArticleFilterQueryDefinition {
  tag = 'tag',
  author = 'author',
  favorited = 'favorited',
};

export type ArticleFilterQueryParams = {
  [ArticleFilterQueryDefinition.tag]?: Maybe<string>,
  [ArticleFilterQueryDefinition.author]?: Maybe<string>,
  [ArticleFilterQueryDefinition.favorited]?: Maybe<string>,
};
