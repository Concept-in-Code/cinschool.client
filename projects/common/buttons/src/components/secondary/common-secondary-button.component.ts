import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Maybe } from 'common/core';
import { CommonButton } from '../../typings/common-button';
import { CommonButtonType } from '../../typings/common-button-type';

@Component({
  selector: 'common-secondary-button',
  templateUrl: './common-secondary-button.component.html',
  styleUrl: './common-secondary-button.component.scss',
  standalone: true,
  imports: [
    MatButton,
  ],
})
export class CommonSecondaryButtonComponent implements CommonButton {

  @Input()
  public disabled = false;

  @Input()
  public type?: Maybe<CommonButtonType> = 'button';

}
