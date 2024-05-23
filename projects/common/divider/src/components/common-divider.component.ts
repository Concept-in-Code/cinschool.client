import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'common-divider',
  templateUrl: './common-divider.component.html',
  standalone: true,
  imports: [
    MatDividerModule,
  ],
})
export class CommonDividerComponent { }
