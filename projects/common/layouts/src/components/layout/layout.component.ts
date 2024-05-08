import { Component, Input } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'common-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
  ]
})
export class LayoutComponent {

  @Input({ required: true })
  public version!: string;

}
