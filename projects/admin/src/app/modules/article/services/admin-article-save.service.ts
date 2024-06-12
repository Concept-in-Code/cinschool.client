import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, ArticleSave } from 'common/core';
import { CommonFeedbackService } from 'common/feedback';
import { Observable, tap } from 'rxjs';
import { articleUrl } from '../../../core/constants/admin-url.constants';

@Injectable()
export class ArticleAdminSaveService {

  constructor(
    private http: HttpClient,
    private feedbackService: CommonFeedbackService,
  ) { }

  public saveArticle(article: ArticleSave): Observable<Article> {
    return article?.slug
      ? this.editArticle(article)
      : this.createArticle(article);
  }

  private editArticle(article: ArticleSave): Observable<Article> {
    return this.http
      .put<Article>(`/${articleUrl}/${article.slug}`, { article })
      .pipe(
        tap(() => this.feedbackService.open({
          type: 'success',
          message: 'Dein Beitrag wurde gespeichert',
        }))
      );
  }

  private createArticle(article: ArticleSave): Observable<Article> {
    return this.http
      .post<Article>(`/${articleUrl}`, { article })
      .pipe(
        tap(() => this.feedbackService.open({
          type: 'success',
          message: 'Vielen Dank für deinen Beitrag',
        }))
      );
  }

}
