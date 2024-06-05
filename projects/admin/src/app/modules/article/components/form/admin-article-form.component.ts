import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputComponent } from 'common/forms/input';
import { CommonFormStepComponent, CommonFormStepperComponent } from 'common/forms/stepper';

@Component({
  selector: 'admin-article-form',
  templateUrl: './admin-article-form.component.html',
  styleUrl: './admin-article-form.component.scss',
  standalone: true,
  imports: [
    CommonFormStepComponent,
    CommonFormStepperComponent,
    CommonInputComponent,
    
    ReactiveFormsModule,
  ],
})
export class AdminArticleFormComponent {

  public contentForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  })

  public metadataForm = this.fb.group({
    
  })
  
  constructor(
    private fb: FormBuilder
  ) {}

  public cancelled(): void {

  }

  public saved(): void {
    
  }

}
