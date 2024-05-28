import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonButtonComponent } from 'common/buttons';
import { User } from 'common/core';
import { CommonDividerComponent } from 'common/divider';
import { CommonInputComponent } from 'common/forms/input';
import { CommonPasswordConfirmComponent } from 'common/forms/password';
import { CommonValidators } from 'common/forms/validators';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'account-register',
  templateUrl: './account-register.component.html',
  styleUrl: './account-register.component.scss',
  standalone: true,
  providers: [
    RegisterService,
  ],
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
    username: ['', [Validators.required]],
    email: ['', [Validators.required, CommonValidators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
  ) {}

  public onSubmit(): void {
    this.registerService.register(this.form.value as User)
      .subscribe();
  }

}
