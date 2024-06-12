/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Maybe } from 'common/core';
import { Observable, Subject, isObservable, takeUntil } from 'rxjs';
import { CommonColumn } from '../../typings/common-column';

@Component({
  selector: 'common-table-cell',
  template: `
    <span> {{ input ?? ' - ' }}</span>
  `,
  styles: `
    :host {
      overflow-wrap: break-word
    }
  `,
  standalone: true,
})
export class CommonTableCellComponent<T> implements OnInit, OnChanges, OnDestroy {

  @Input()
  public column?: Maybe<CommonColumn<any>>;

  @Input()
  public row?: any;

  @Input()
  public transformation?: (input?: any) => T;

  public input?: T;

  private destroy = new Subject<void>();

  public ngOnInit(): void {
    this.createInput();
  }

  public ngOnChanges(): void {
    this.createInput();
  }

  private createInput(): void {
    if (this.row && this.column) {
      this.column?.value
        ? this.function(this.column?.value(this.row))
        : this.inputValue(this.fieldValue(this.row, this.column?.field));
    }
  }

  private function(result: Observable<Maybe<string>> | Maybe<string>): void {
    isObservable(result)
      ? result.pipe(takeUntil(this.destroy))
          .subscribe(value => this.inputValue(value))
      : this.inputValue(result);
  }

  private inputValue(value: any) {
    this.input = this.transformation
      ? this.transformation(value)
      : value;
  }

  private fieldValue(
    object: any,
    field: Maybe<string>
  ): any {
    return field?.split('.').reduce((obj, field) => (obj as never)?.[field], object);
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
