import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Maybe } from 'common/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonInputType } from '../type/input-type';

@Component({
  selector: 'common-input',
  templateUrl: './common-input.component.html',
  styleUrl: './common-input.component.scss',
  standalone: true,
  // Below provider is not necessary because of explict NgControl.valueAccessor = this 
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi:true,
  //     useExisting: CommonInputComponent
  //   },
  // ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class CommonInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input()
  public label?: Maybe<string>;

  @Input()
  public required = false;

  @Input()
  public type: CommonInputType = 'text';

  public control = new FormControl('' as Maybe<string>);

  public onTouched?: () => void;
  protected onChange?: (value?: Maybe<string>) => void;

  protected destroy = new Subject<void>();

  constructor(
    @Optional() @Self()
    public ngControl: NgControl
  ) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(value => {
        this.onTouched?.();
        this.onChange?.(value);
      });
  }

  public ngOnInit(): void {
    if (this.ngControl) {
      this.required = this.required || this.ngControl?.control?.hasValidator(Validators.required) || false;
    }
  }

  public writeValue(value?: Maybe<string>): void {
    this.control.patchValue(value, { 
      emitEvent: false
    });
  }

  public registerOnChange(onChange: (value?: Maybe<string>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched?: () => void): void {
    this.onTouched = onTouched;
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.control.disable()
      : this.control.enable();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
