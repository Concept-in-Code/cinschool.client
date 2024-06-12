import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Maybe, Pageable } from 'common/core';
import { Observable, Subject, delay, isObservable, merge, take, takeUntil, tap } from 'rxjs';
import { CommonCellDirective } from '../../directives/common-table-cell.directive';
import { CommonTablePaginatorService } from '../../service/common-table-paginator.service';
import { CommonColumn } from '../../typings/common-column';
import { CommonRowAction } from '../../typings/common-row-action';
import { CommonSortPaginate } from '../../typings/common-sort-paginate';
import { CommonTableActionsComponent } from '../actions/common-table-actions.component';
import { CommonTablePaginatorComponent } from '../paginator/common-table-paginator.component';

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  standalone: true,
  animations: [
    trigger('expand', [
      state('closed', style({ height: '0', padding: '0', display: 'flex' })),
      state('opened', style({ height: '*', display: 'block' })),
      transition('closed <=> opened', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
  imports: [
    AsyncPipe,
    CommonCellDirective,
    CommonTableActionsComponent,
    CommonTablePaginatorComponent,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    NgTemplateOutlet,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CommonTablePaginatorService
    }
  ]
})
export class CommonTableComponent<T> implements AfterViewInit, OnDestroy {

  @Input()
  public set actions(actions: CommonRowAction<T>[]) {
    this._actions = actions;
    this.createDisplayedColumns();
  }

  public _actions?: CommonRowAction<T>[];

  @Input({ required: true })
  public set columns(columns: CommonColumn<T>[]) {
    this._columns = columns;
    this.createDisplayedColumns();
  }

  public _columns?: CommonColumn<T>[];

  @Input()
  public set data(data: Observable<Maybe<Pageable<T>>> | Maybe<Pageable<T>>) {
    isObservable(data)
      ? data
        .pipe(take(1))
        .subscribe(data => this.dataSource = data)
      : (this.dataSource = data);
  }

  public dataSource?: Maybe<Pageable<T>>;

  @Input()
  public initParams?: CommonSortPaginate;

  @Input()
  public queryParams: boolean = true;

  @Output()
  public sortPaginate = new EventEmitter<CommonSortPaginate>();

  @Output()
  public rowClicked = new EventEmitter<Maybe<T>>();

  @ContentChild('details')
  public detailsComponent?: TemplateRef<any>;

  @ViewChild(CommonTablePaginatorComponent)
  public paginator!: CommonTablePaginatorComponent;

  @ViewChild(MatSort)
  public sort!: MatSort;

  public clickable = false;

  public displayedColumns: string[] = [];

  public expandRow?: Maybe<T>;

  private destroy = new Subject<void>();

  public ngAfterViewInit(): void {
    this.sort.sort({
      id: this.initParams?.sort ?? '',
      start: this.initParams?.dir as SortDirection ?? '',
      disableClear: true
    });

    this.sort.sortChange
      .pipe(
        delay(0),
        takeUntil(this.destroy)
      ).subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).pipe(
      delay(0),
      tap(() => this.sortPaginate.emit({
        dir: this.sort.direction,
        sort: this.sort.active,
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
      })),
      takeUntil(this.destroy),
    ).subscribe();

    this.clickable = this.rowClicked.observed || !!this.detailsComponent;
  }

  private createDisplayedColumns(): void {
    this.displayedColumns = [
      ...this._columns?.map(c => c.field) || [],
      ...(this._actions ? ['actions'] : [])
    ]
  }

  public rowClick(row: T): void {
    this.detailsComponent
      ? (this.expandRow = this.expandRow === row ? undefined : row)
      : this.rowClicked.emit();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
