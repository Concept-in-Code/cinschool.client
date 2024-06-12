import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'common/core';
import { CommonColumn, CommonRowAction, CommonSortPaginate, CommonTableComponent } from 'common/table';
import { ArticleAdminReadService } from '../../services/admin-article-read.service';
import { AdminArticleDetailsComponent } from '../details/admin-article-details.component';

@Component({
  selector: 'admin-article-overview',
  templateUrl: './admin-article-overview.component.html',
  styleUrl: './admin-article-overview.component.scss',
  standalone: true,
  providers: [
    ArticleAdminReadService,
  ],
  imports: [
    AdminArticleDetailsComponent,
    CommonTableComponent,
  ],
})
export class AdminArticleOverviewComponent {

  public actions: CommonRowAction<Article>[] = [
    {
      icon: 'edit',
      callback: row => this.router.navigate([row?.slug, 'form'], { relativeTo: this.activatedRoute }),
    },
    {
      icon: 'delete',
      callback: row => console.log('Delete me'),
    },
  ];

  public columns: CommonColumn<Article>[] = [
    {
      field: 'title',
      label: 'Titel',
    },
    {
      field: 'author.username',
      label: 'Autor',
    },
    {
      field: 'tagList',
      label: 'Tags',
    },
  ];

  public data = this.articleReadService.getArticles();

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleReadService: ArticleAdminReadService,
    private router: Router,
  ) { }

  public updateParams($event: CommonSortPaginate) {
    console.log($event);
  }

}
