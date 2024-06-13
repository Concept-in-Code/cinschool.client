import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonButtonComponent } from 'common/buttons';
import { CommonFilterService } from '../services/common-filter.service';

@Component({
  selector: 'common-filter-area',
  templateUrl: './common-filter-area.component.html',
  styleUrls: ['./common-filter-area.component.scss'],
  standalone: true,
  animations: [
    trigger('collapse', [
      state('true', style({ height: AUTO_STYLE, opacity: 1 })),
      state('false', style({ height: '0', opacity: 0, })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('200ms ease-out'))
    ])
  ],
  imports: [
    AsyncPipe,
    CommonButtonComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgTemplateOutlet,
  ]
})
export class CommonFilterAreaComponent {

  @Input()
  public filtersActive = this.filterService.filtersActive();

  @Output()
  public filtersCleared = new EventEmitter<void>();

  public filtersCollapsed = true;

  constructor(
    public filterService: CommonFilterService
  ) {}

  public clearFilters(): void {
    this.filtersCleared.emit();
    this.filterService.clearFilters();
  }

}
