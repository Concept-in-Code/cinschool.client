import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackComponent } from '../components/feedback.component';
import { Feedback, FeedbackType } from '../typings/feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  public open(feedback: Feedback): void {
    this.snackBar.dismiss();
    this.snackBar.openFromComponent(FeedbackComponent, {
      duration: this.duration(feedback.type),
      data: feedback,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: ['feedback', `${feedback.type}-feedback`] // see styles.scss for panel classes 
    });
  }

  private duration(type: FeedbackType): number {
    switch (type) {
      case 'critical':
        return 999999;
      case 'success':
      case 'info':
      default:
        return 15000;
    }
  }

}