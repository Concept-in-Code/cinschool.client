import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonInputComponent } from '../../../../input';

@Component({
  selector: 'common-password-input',
  templateUrl: './common-password-input.component.html',
  styleUrls: ['./common-password-input.component.scss'],
  standalone: true,
  imports: [
    CommonInputComponent,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class CommonPasswordInputComponent extends CommonInputComponent {

  @Input()
  public override label = 'Passwort';

  public hide = true;
}