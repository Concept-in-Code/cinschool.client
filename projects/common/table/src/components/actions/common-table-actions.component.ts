import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonButtonComponent } from 'common/buttons';
import { Maybe } from 'common/core';
import { Subject } from 'rxjs';
import { CommonRowAction, CommonRowActionComponent, CommonRowActionComponentInput, CommonRowCustomAction } from '../../typings/common-row-action';

@Component({
  selector: 'common-table-actions',
  templateUrl: './common-table-actions.component.html',
  styleUrls: ['./common-table-actions.component.scss'],
  standalone: true,
  imports: [
    CommonButtonComponent,
    MatIconModule,
    NgComponentOutlet,
  ]
})
export class CommonTableActionsComponent<T> implements OnDestroy {

  @Input()
  public actions?: Maybe<CommonRowAction<any>[]>;

  @Input({ required: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public row?: Maybe<any>;

  private destroy = new Subject<void>();

  public actionComponent(action: string | CommonRowActionComponent<T> | CommonRowCustomAction<T>): Maybe<CommonRowActionComponentInput> {
    return typeof action === 'function'
      ? (action as CommonRowActionComponent<T>)?.(this.row)
      : undefined;
  }

  public callback(action: CommonRowAction<T>): void {
    (action as CommonRowCustomAction<T>).callback?.(this.row)
  }

  public icon(action: CommonRowAction<T>): string {
    return (action as CommonRowCustomAction<T>).icon;
  }

  public isDisabled(action: CommonRowAction<T>): boolean {
    return !!(action as CommonRowCustomAction<T>)?.disable?.(this.row);
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
