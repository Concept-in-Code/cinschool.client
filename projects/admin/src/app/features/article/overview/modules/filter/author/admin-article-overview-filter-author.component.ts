import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Maybe } from 'common/core';
import { CommonFilterService } from 'common/filter';
import { CommonInputComponent } from 'common/forms/input';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ArticleFilterQueryDefinition, ArticleFilterQueryParams } from '../../../typings/admin-article-filter';

@Component({
  selector: 'admin-article-overview-filter-author',
  templateUrl: './admin-article-overview-filter-author.component.html',
  styleUrls: ['./admin-article-overview-filter-author.component.scss'],
  standalone: true,
  imports: [
    CommonInputComponent,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class AdminArticleOverivewFilterAuthorComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = ArticleFilterQueryDefinition.author;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string>>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  constructor(
    private filterService: CommonFilterService
  ) {
    this.watchValueChange();
  }

  public ngOnInit(): void {
    if(this.queryParamKey) {
      this.filterService.queryParams<ArticleFilterQueryParams>()
        .pipe(takeUntil(this.destroy))
        .subscribe(params => {
          this.control.setValue(params?.[this.queryParamKey], {
            emitEvent: false,
          });
        });
    }
  }

  private watchValueChange(): void {
    this.control.valueChanges
      .pipe(
        debounceTime(750),
        distinctUntilChanged(),
        takeUntil(this.destroy)
      )
      .subscribe(value => {
        this.valueChanged.emit(value);

        if (this.queryParamKey) {
          this.filterService.updateParam(this.queryParamKey, value);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
