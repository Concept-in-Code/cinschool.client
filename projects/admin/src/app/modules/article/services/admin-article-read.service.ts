import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, ArticleResponse, ArticlesResponse, Pageable } from 'common/core';
import { Observable, map } from 'rxjs';
import { articleUrl } from '../../../core/constants/admin-url.constants';

@Injectable()
export class ArticleAdminReadService {

  constructor(
    private http: HttpClient,
  ) { }

  public getArticle(slug: string): Observable<Article> {
    return this.http
      .get<ArticleResponse>(`/${articleUrl}/${slug}`)
      .pipe(
        map(response => response.article)
      );
  }

  public getArticles(): Observable<Pageable<Article>> {
    return this.http
      .get<ArticlesResponse>(`/${articleUrl}`)
      .pipe(
        map(response => ({
          count: response.articlesCount,
          result: response.articles
        }))
      );
  }

}
