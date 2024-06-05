import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonLayoutComponent } from 'common/layouts';

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

}
