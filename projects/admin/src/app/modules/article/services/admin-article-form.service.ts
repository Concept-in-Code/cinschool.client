import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonFeedbackService } from 'common/feedback';
import { Observable, tap } from 'rxjs';
import { ArticleFormInput } from '../typings/article-form-input';

@Injectable()
export class ArticleAdminFormService {

  constructor(
    private http: HttpClient,
    private feedbackService: CommonFeedbackService,
  ) { }

  public saveArticle(article: ArticleFormInput): Observable<unknown> {
    return this.http
      .post('/articles', { article })
      .pipe(
        tap(() => this.feedbackService.open({
          type: 'success',
          message: 'Vielen Dank für deinen Beitrag',
        }))
      );
  }

}
