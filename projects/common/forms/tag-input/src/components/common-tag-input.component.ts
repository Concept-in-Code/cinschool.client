import { AfterContentInit, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Maybe } from 'common/core';

@Component({
  selector: 'common-tag-input',
  templateUrl: './common-tag-input.component.html',
  styleUrls: ['./common-tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CommonTagInputComponent,
      multi: true
    }
  ],
  standalone: true,
})

export class CommonTagInputComponent implements AfterContentInit, ControlValueAccessor {

  private onChange?: (value: Maybe<string[]>) => void;
  private onTouch?: () => void;

  //TODO: Remove this entirely! It's just for testing the API
  public ngAfterContentInit(): void {
    this.onChange?.(['Tag3']);
    this.onTouch?.();
  }

  public writeValue(value: Maybe<string[]>): void {
    // Update control
  }

  public registerOnChange(onChange: (value: Maybe<string[]>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

}
