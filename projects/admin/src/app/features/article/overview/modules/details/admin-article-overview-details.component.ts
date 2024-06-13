import { Component, Input } from '@angular/core';
import { Article, Maybe } from 'common/core';

@Component({
  selector: 'admin-article-overview-details',
  templateUrl: './admin-article-overview-details.component.html',
  standalone: true,
})
export class AdminArticleOverviewDetailsComponent {

  @Input({ required: true })
  public article?: Maybe<Article>;

}
