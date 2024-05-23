import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonButtonComponent } from 'common/buttons';
import { CommonDividerComponent } from 'common/divider';
import { CommonInputComponent } from 'common/forms/input';
import { CommonPasswordConfirmComponent } from 'common/forms/password';
import { CommonValidators } from 'common/forms/validators';

@Component({
  selector: 'account-register',
  templateUrl: './account-register.component.html',
  styleUrl: './account-register.component.scss',
  standalone: true,
  imports: [
    CommonButtonComponent,
    CommonDividerComponent,
    CommonInputComponent,
    CommonPasswordConfirmComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AccountRegisterComponent {

  public form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, CommonValidators.email]],
  });

  constructor(
    private fb: FormBuilder,
  ) {}

  public onSubmit(): void {
    console.log(this.form.value);
  }

}
