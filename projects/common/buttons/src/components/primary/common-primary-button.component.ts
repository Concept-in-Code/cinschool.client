import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Maybe } from 'common/core';
import { CommonButton } from '../../typings/common-button';
import { CommonButtonType } from '../../typings/common-button-type';

@Component({
  selector: 'common-primary-button',
  templateUrl: './common-primary-button.component.html',
  styleUrl: './common-primary-button.component.scss',
  standalone: true,
  imports: [
    MatButton,
  ],
})
export class CommonPrimaryButtonComponent implements CommonButton {

  @Input()
  public disabled = false;

  @Input()
  public type?: Maybe<CommonButtonType> = 'button';

}
