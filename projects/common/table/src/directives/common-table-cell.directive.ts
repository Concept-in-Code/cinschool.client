/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Maybe } from 'common/core';
import { CommonTableCellComponent } from '../components/cell/common-table-cell.component';
import { CommonColumn } from '../typings/common-column';

@Directive({
  selector: '[commonRow]',
  standalone: true,
})
export class CommonCellDirective<T> implements OnInit {

  @Input()
  public commonRow?: Maybe<T>;

  @Input()
  public column?: Maybe<CommonColumn<T>>;

  constructor(
    private viewContainer: ViewContainerRef) { }

  public ngOnInit(): void {
    switch(this.column?.type) {
      case 'DATE':
        this.createComponent(value => new Date(value).toLocaleDateString());
        break;
      case 'DATETIME':
        this.createComponent(value => this.dateTime(value));
        break;
      case 'LIST':
        this.createComponent(value => value.length.toString());
        break;
      case 'TIME':
        this.createComponent(value => this.time(value));
        break;
      default:
        this.createComponent();
    }
  }

  private createComponent<T>(
    transformation?: (input?: any) => T
  ): void {
    const instance = this.viewContainer
      .createComponent<CommonTableCellComponent<T>>(CommonTableCellComponent)
      .instance;

    instance.column = this.column;
    instance.row = this.commonRow;
    instance.transformation = transformation;
  }

  private dateTime(value: string): string {
    return `${this.date(value)}, ${this.time(value)}`;
  }

  private date(value: string): string {
    return new Date(value).toLocaleDateString();
  }

  private time(value: string): string {
    return new Date(value).toLocaleTimeString();
  }

}
