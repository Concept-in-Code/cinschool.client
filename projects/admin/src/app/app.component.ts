import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonLayoutComponent } from 'common/layouts';
import packageJson from '../../../../package.json';
import { AdminMenuComponent } from './core/components/menu/admin-menu.component';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    AdminMenuComponent,
    CommonLayoutComponent,
    RouterOutlet
  ],
})
export class AppComponent {
  
  public version = packageJson.version;

}
