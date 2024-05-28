import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Maybe } from 'common/core';
import { CommonPasswordService, CommonValidators } from 'common/forms/validators';
import { Subject, takeUntil } from 'rxjs';
import { CommonPasswordInputComponent } from '../input/common-password-input.component';
import { CommonPasswordStrengthComponent } from '../strength/common-password-strength.component';

@Component({
  selector: 'common-password-confirm',
  templateUrl: './common-password-confirm.component.html',
  styleUrls: ['./common-password-confirm.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CommonPasswordConfirmComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CommonPasswordConfirmComponent
    },
  ],
  imports: [
    FormsModule,
    CommonPasswordInputComponent,
    CommonPasswordStrengthComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class CommonPasswordConfirmComponent implements ControlValueAccessor, OnDestroy, Validator {

  public form = this.fb.group({
    password: ['', {
      validators: [
        Validators.required,
      ],
      asyncValidators: [CommonValidators.passwordStrength(this.passwordService)],
    }],
    confirm: ['', {
      validators: [
        Validators.required,
      ],
    }],
  }, { validators: CommonValidators.same('password', 'confirm') });

  private onChange?: (value?: Maybe<string>) => void;
  private onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private passwordService: CommonPasswordService) {
      this.form.valueChanges
        .pipe(takeUntil(this.destroy))
        .subscribe(value => this.mark(value?.password));
  }
  
  private mark(value: Maybe<string>) {
    !value && this.passwordService.resetPasswordStrength();
    this.onChange?.(value);
    this.onTouched?.();
  }

  public writeValue(password: Maybe<string>): void {
    this.form.patchValue({ password });
  }

  public registerOnChange(onChange: (value?: Maybe<string>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched?: () => void): void {
    this.onTouched = onTouched;
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.form.disable()
      : this.form.enable();
  }

  public validate(): ValidationErrors | null {
    return !this.form.valid
      ? {
          ...this.form.errors,
          ...this.form.controls.confirm.errors,
          ...this.form.controls.password.errors
        }
      : null;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}