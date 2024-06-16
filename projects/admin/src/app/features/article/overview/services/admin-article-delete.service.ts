import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, ArticleSave } from 'common/core';
import { CommonFeedbackService } from 'common/feedback';
import { Observable, tap } from 'rxjs';
import { articleUrl } from '../../../../core/constants/admin-url.constants';

@Injectable()
export class ArticleAdminDeleteService {

  constructor(
    private http: HttpClient,
    private feedbackService: CommonFeedbackService,
  ) { }

  public deleteArticle(slug: string): Observable<Object> {
    return this.http
      .delete(`/${articleUrl}/${slug}`)
      .pipe(
        tap(() => this.feedbackService.open({
          type: 'success',
            message: `Der Artikel ${slug} wurde gelöscht`,
        }))
      );

      //TODO: how to handle errors?
  }

}
