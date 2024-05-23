import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'common-footer',
  templateUrl: './common-footer.component.html',
  styleUrl: './common-footer.component.scss',
  standalone: true,
  imports:[
    MatToolbarModule,
  ]
})
export class CommonFooterComponent {

  @Input({ required: true})
  public version!: string;

  public currentYear = new Date().getFullYear();

}
