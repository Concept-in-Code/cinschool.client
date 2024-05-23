import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CommonValidators {

  public static email(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return control.value
      ? !pattern.test(control.value)
        ? { invalidEmail: true }
        : null
      : null;
  }

  public static same(...controls: string[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const values = controls.map((i) => group?.get(i)?.value);

      return values.every((i) => i === values[0]) ? null : { notSame: true };
    };
  }

}