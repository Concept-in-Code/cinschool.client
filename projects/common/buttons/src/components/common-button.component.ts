import { NgComponentOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonButton, CommonButtonClass } from '../typings/common-button';
import { CommonButtonLayout } from '../typings/common-button-style';
import { CommonButtonType } from '../typings/common-button-type';
import { CommonDefaultButtonComponent } from './default/common-default-button.component';
import { CommonPrimaryButtonComponent } from './primary/common-primary-button.component';
import { CommonSecondaryButtonComponent } from './secondary/common-secondary-button.component';

@Component({
  selector: 'common-button',
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    NgComponentOutlet,
  ],
})
export class CommonButtonComponent {

  @Input()
  public disabled?: boolean;

  @Input()
  public set layout(layout: CommonButtonLayout) {

    switch(layout) {
      case 'primary':
        this.button = CommonPrimaryButtonComponent;
        break;
      case 'secondary':
        this.button = CommonSecondaryButtonComponent;
        break;
      default:
        this.button = CommonDefaultButtonComponent;
    }
  }

  @Input()
  public type?: CommonButtonType;

  public button: CommonButtonClass<CommonButton> = CommonDefaultButtonComponent;  

}
