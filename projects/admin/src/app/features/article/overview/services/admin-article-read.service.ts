import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, ArticleResponse, ArticlesResponse, Pageable } from 'common/core';
import { Observable, map, switchMap } from 'rxjs';
import { articleUrl } from '../../../../core/constants/admin-url.constants';

@Injectable()
export class ArticleAdminReadService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) { }

  public getArticle(slug: string): Observable<Article> {
    return this.http
      .get<ArticleResponse>(`/${articleUrl}/${slug}`)
      .pipe(
        map(response => response.article)
      );
  }

  public getArticles(): Observable<Pageable<Article>> {
    return this.activatedRoute.queryParams
      .pipe(
        map(() => this.router.url.split('?')[1]),
        switchMap(params =>
          this.http.get<ArticlesResponse>(`/${articleUrl}${params ? `?${params}`: ''}`)
        ),
        map(response => ({
          count: response.articlesCount,
          result: response.articles
        }))
      )
  }

}
