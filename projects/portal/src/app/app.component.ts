import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from 'common/layouts';
import packageJson from '../../../../package.json';

@Component({
  selector: 'common-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
  ],
})
export class AppComponent {

  public version = packageJson.version;
}
