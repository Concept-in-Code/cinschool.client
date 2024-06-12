import { Author } from '../author/author';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  tagList: string[];
  author: Author;
  favorited: boolean;
  favoritesCount: number;
}

export interface ArticleResponse {
  article: Article;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
