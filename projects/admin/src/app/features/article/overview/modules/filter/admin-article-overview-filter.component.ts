import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonFilterAreaComponent, CommonFilterService } from 'common/filter';
import { Subject, takeUntil } from 'rxjs';
import { ArticleFilterQueryDefinition, ArticleFilterQueryParams } from '../../typings/admin-article-filter';
import { AdminArticleOverivewFilterAuthorComponent } from './author/admin-article-overview-filter-author.component';

@Component({
  selector: 'admin-article-overview-filter',
  templateUrl: './admin-article-overview-filter.component.html',
  styleUrls: ['./admin-article-overview-filter.component.scss'],
  standalone: true,
  providers: [
    CommonFilterService,
  ],
  imports: [
    AdminArticleOverivewFilterAuthorComponent,
    CommonFilterAreaComponent,
  ]
})
export class AdminArticleOverviewFilterComponent implements OnInit, OnDestroy {

  @Output()
  public filters = new EventEmitter<ArticleFilterQueryParams>();

  private destroy = new Subject<void>();

  constructor(
    private filterService: CommonFilterService,
  ) { }

  public ngOnInit(): void {
    this.filterService.init(ArticleFilterQueryDefinition);

    this.filterService.queryParams<ArticleFilterQueryParams>()
      .pipe(takeUntil(this.destroy))
      .subscribe(params => this.filters.next(params));
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
