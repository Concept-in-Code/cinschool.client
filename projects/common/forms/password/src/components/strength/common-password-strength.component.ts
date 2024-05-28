import { AsyncPipe, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { CommonPasswordService } from 'common/forms/validators';

@Component({
  selector: 'common-password-strength',
  templateUrl: './common-password-strength.component.html',
  styleUrls: ['./common-password-strength.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgStyle,
  ]
})
export class CommonPasswordStrengthComponent {

  public rate = this.passwordService.passwordStrength();

  constructor(
    private passwordService: CommonPasswordService,
  ) { }
}