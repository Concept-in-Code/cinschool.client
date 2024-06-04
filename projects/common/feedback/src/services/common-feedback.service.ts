import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonFeedbackComponent } from '../components/common-feedback.component';
import { CommonFeedback, CommonFeedbackType } from '../typings/common-feedback';

@Injectable({ providedIn: 'root' })
export class CommonFeedbackService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  public open(feedback: CommonFeedback): void {
    this.snackBar.dismiss();
    this.snackBar.openFromComponent(CommonFeedbackComponent, {
      duration: this.duration(feedback.type),
      data: feedback,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: ['feedback', `${feedback.type}-feedback`] // see styles.scss for panel classes 
    });
  }

  private duration(type: CommonFeedbackType): number {
    switch (type) {
      case 'critical':
        return 999999;
      case 'success':
      case 'info':
      default:
        return 20000;
    }
  }

}