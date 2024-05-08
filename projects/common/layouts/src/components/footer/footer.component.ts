import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'common-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports:[
    MatToolbarModule,
  ]
})
export class FooterComponent {

  @Input({ required: true})
  public version!: string;

  public currentYear = new Date().getFullYear();

}
