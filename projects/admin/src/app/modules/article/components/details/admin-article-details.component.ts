import { Component, Input } from '@angular/core';
import { Article, Maybe } from 'common/core';

@Component({
  selector: 'admin-article-details',
  templateUrl: './admin-article-details.component.html',
  standalone: true,
})
export class AdminArticleDetailsComponent {

  @Input({ required: true })
  public article?: Maybe<Article>;

}
