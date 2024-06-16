import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Maybe } from 'common/core';
import {MatIconModule} from '@angular/material/icon';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormsModule} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule],
  standalone: true,
})

export class CommonTagInputComponent implements ControlValueAccessor {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.ariaLabel = "Tag editor";
    this.label = "Tags"
    this.placeholder = "New Tag..."
  }

  @Input()
  public addOnBlur = true;

  @Input()
  public label: string;

  @Input()
  public ariaLabel: string;

  @Input()
  public placeholder: string;

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
    if (value) {
      if(!!this.data) {
        if(!this.data.includes(value)){
          this.data.unshift(value);
        }
      } else {
        this.data = [value];
      }
    }
    // Clear the input value
    event.chipInput!.clear();

    this.onChange?.(this.data)
    this.onTouch?.()
  }

  // //TODO: Remove this entirely! It's just for testing the API
  // public ngAfterContentInit(): void {
  //   this.onChange?.(['Tag3']);
  //   this.onTouch?.();
  // }

  public writeValue(value: Maybe<string[]>): void {
    if(!this.arrayEquals(value, this.data)) {
      this.data = value;
      this.onChange?.(this.data)
      this.onTouch?.()
    }
  }

  public registerOnChange(onChange: (value: Maybe<string[]>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  //TODO: where to move this?
  private arrayEquals<Type>(a: Maybe<Type[]>, b: Maybe<Type[]>): boolean {
    if (a === b) return true;
    if (!a && ! b) return true;
    if (!a || ! b) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}
