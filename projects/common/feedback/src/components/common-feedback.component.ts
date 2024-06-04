import { KeyValuePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonButtonComponent } from 'common/buttons';
import { CommonDividerComponent } from 'common/divider';
import { CommonFeedback } from '../typings/common-feedback';

@Component({
  selector: 'common-feedback',
  templateUrl: './common-feedback.component.html',
  styleUrls: ['./common-feedback.component.scss'],
  standalone: true,
  imports: [
    CommonButtonComponent,
    CommonDividerComponent,
    KeyValuePipe,
    MatIconModule,
  ],
})
export class CommonFeedbackComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public feedback: CommonFeedback,
    public ref: MatSnackBarRef<CommonFeedbackComponent>,
  ) { }
}
