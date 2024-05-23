import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonLayoutComponent } from 'common/layouts';
import packageJson from '../../../package.json';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonLayoutComponent,
  ],
})
export class AppComponent {

  public version = packageJson.version;
}
