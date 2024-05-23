import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonButtonComponent } from 'common/buttons';
import { CommonDividerComponent } from 'common/divider';
import { CommonInputComponent } from 'common/forms/input';
import { CommonPasswordInputComponent } from 'common/forms/password';
import { CommonValidators } from 'common/forms/validators';

@Component({
  selector: 'account-login',
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.scss',
  standalone: true,
  imports: [
    CommonButtonComponent,
    CommonDividerComponent,
    CommonInputComponent,
    CommonPasswordInputComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AccountLoginComponent {

  public form = this.fb.group({
    email: ['', [Validators.required, CommonValidators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
  ) {}

  public onSubmit(): void {
    console.log(this.form.value)
  }

}
