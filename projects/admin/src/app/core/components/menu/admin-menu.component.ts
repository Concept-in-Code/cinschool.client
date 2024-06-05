import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonLayoutComponent } from 'common/layouts';
import { articleUrl } from '../../constants/admin-url.constants';

@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss',
  standalone: true,
  imports: [
    CommonLayoutComponent,
    RouterModule,
  ],
})
export class AdminMenuComponent {

  public articleUrl = articleUrl;

}
