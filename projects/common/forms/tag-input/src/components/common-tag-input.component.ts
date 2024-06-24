import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  standalone: true,
})

export class CommonTagInputComponent implements ControlValueAccessor {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input()
  public addOnBlur = true;

  @Input()
  public label = 'Tags';

  @Input()
  public ariaLabel = 'Tag editor';

  @Input()
  public placeholder = 'Neue Tags...';

  public data: Maybe<string[]>

  private onChange?: (value: Maybe<string[]>) => void;
  private onTouch?: () => void;

  public remove(chip: string): void {
    if(!!this.data) {
      this.data = this.data.filter(e => e !== chip);
    }
    this.onChange?.(this.data)
    this.onTouch?.()
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && (!this.data || !this.data.includes(value))) {
      this.data = this.data || [];
      this.data.unshift(value);
    }
    // Clear the input value
    event.chipInput!.clear();

    this.onChange?.(this.data)
    this.onTouch?.();
  }

  public writeValue(value: Maybe<string[]>): void {
    this.data = value;
    this.onTouch?.();
  }

  public registerOnChange(onChange: (value: Maybe<string[]>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

}
