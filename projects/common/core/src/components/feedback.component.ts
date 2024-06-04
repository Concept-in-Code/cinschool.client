import { KeyValuePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonButtonComponent } from 'common/buttons';
import { CommonDividerComponent } from 'common/divider';
import { Feedback } from '../typings/feedback';

@Component({
  selector: 'common-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [
    CommonButtonComponent,
    CommonDividerComponent,
    KeyValuePipe,
    MatIconModule,
  ],
})
export class FeedbackComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public feedback: Feedback,
    public ref: MatSnackBarRef<FeedbackComponent>,
  ) { }
}
