import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonButtonComponent } from 'common/buttons';
import { Maybe } from 'common/core';
import { Subject } from 'rxjs';
import { FormStepperService } from '../../services/form-stepper.service';
import { CommonFormStepComponent } from '../step/common-form-step.component';

@Component({
  selector: 'common-form-stepper',
  templateUrl: './common-form-stepper.component.html',
  styleUrls: ['./common-form-stepper.component.scss'],
  standalone: true,
  providers: [
    FormStepperService,
  ],
  imports: [
    AsyncPipe,
    CommonFormStepComponent,
    CommonButtonComponent,
    MatExpansionModule,
  ],
})
export class CommonFormStepperComponent implements AfterViewInit, OnDestroy {

  @Output()
  public cancelled = new EventEmitter<void>();

  @Output()
  public saved = new EventEmitter<Maybe<string>>();

  @ContentChildren(CommonFormStepComponent)
  private steps?: QueryList<CommonFormStepComponent>;

  public valid = this.formStepperService.isValid();

  private destroy = new Subject<void>();

  constructor(
    private formStepperService: FormStepperService,
  ) {}

  public ngAfterViewInit(): void {
    // Timeout fixes ERROR Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError
    // TODO: debug and fix
    setTimeout(() => this.steps?.forEach((step, index) => (step.index = index)));
  }

  public save(): void {
    this.saved.emit();
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  public reset(): void {
    this.steps?.forEach((step) => step.reset());
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
