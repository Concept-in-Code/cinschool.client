import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
  ]
})
export class HeaderComponent {

}
