import { Component, Input } from '@angular/core';
import { CommonFooterComponent } from '../footer/common-footer.component';
import { HeaderComponent } from '../header/common-header.component';

@Component({
  selector: 'common-layout',
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.scss',
  standalone: true,
  imports: [
    CommonFooterComponent,
    HeaderComponent,
  ]
})
export class CommonLayoutComponent {

  @Input({ required: true })
  public version!: string;

}
