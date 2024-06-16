import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'common/core';
import { CommonFilterAreaComponent } from 'common/filter';
import { CommonColumn, CommonPaginate, CommonRowAction, CommonTableComponent } from 'common/table';
import { AdminArticleOverviewDetailsComponent } from '../modules/details/admin-article-overview-details.component';
import { AdminArticleOverviewFilterComponent } from '../modules/filter/admin-article-overview-filter.component';
import { ArticleAdminReadService } from '../services/admin-article-read.service';
import { ArticleAdminDeleteService } from '../services/admin-article-delete.service';
import { first } from 'rxjs';
import { articleUrl } from '../../../../core/constants/admin-url.constants';

@Component({
  selector: 'admin-article-overview',
  templateUrl: './admin-article-overview.component.html',
  styleUrl: './admin-article-overview.component.scss',
  standalone: true,
  providers: [
    ArticleAdminReadService,
    ArticleAdminDeleteService,
  ],
  imports: [
    AdminArticleOverviewDetailsComponent,
    AdminArticleOverviewFilterComponent,
    CommonFilterAreaComponent,
    CommonTableComponent,
  ],
})
export class AdminArticleOverviewComponent {

  public actions: CommonRowAction<Article>[] = [
    {
      icon: 'edit',
      callback: row => this.router.navigate(
        [row?.slug, 'form'],
        { relativeTo: this.activatedRoute }
      ),
    },
    {
      icon: 'delete',
      callback: row => {
        if(!!row && !!row.slug) {
          this.articleDeleteService.deleteArticle(row.slug)
          .pipe(
            first()
          ).subscribe(() => this.router.navigate([articleUrl]));
          //TODO: How to reload the page content?
        }
      }
    },
  ];

  public columns: CommonColumn<Article>[] = [
    {
      field: 'title',
      label: 'Titel',
    },
    {
      field: 'createdAt',
      label: 'Erstellungsdatum',
      type: 'DATETIME'
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
    private articleDeleteService: ArticleAdminDeleteService,
    private router: Router,
  ) { }

  public paginate($event: CommonPaginate) {
    console.log($event);
  }

}
