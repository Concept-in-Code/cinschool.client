import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Maybe } from 'common/core';
import { CommonButtonType } from '../../typings/common-button-type';

@Component({
  selector: 'common-default-button',
  templateUrl: './common-default-button.component.html',
  styleUrl: './common-default-button.component.scss',
  standalone: true,
  imports: [
    MatButton,
  ],
})
export class CommonDefaultButtonComponent {

  @Input()
  public disabled = false;

  @Input()
  public type?: Maybe<CommonButtonType> = 'button';

}
