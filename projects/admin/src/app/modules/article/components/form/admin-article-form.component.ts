import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonInputComponent } from 'common/forms/input';
import { CommonRichtextEditorComponent } from 'common/forms/richtext';
import { CommonFormStepComponent, CommonFormStepperComponent } from 'common/forms/stepper';
import { CommonTagInputComponent } from 'common/forms/tag-input';
import { take } from 'rxjs';
import { ArticleAdminFormService } from '../../services/admin-article-form.service';

@Component({
  selector: 'admin-article-form',
  templateUrl: './admin-article-form.component.html',
  styleUrl: './admin-article-form.component.scss',
  standalone: true,
  providers: [
    ArticleAdminFormService,
  ],
  imports: [
    CommonFormStepComponent,
    CommonFormStepperComponent,
    CommonInputComponent,
    CommonRichtextEditorComponent,
    CommonTagInputComponent,

    ReactiveFormsModule,
  ],
})
export class AdminArticleFormComponent {

  public contentForm = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]]
  });

  public metadataForm = this.fb.group({
    description: [''],
    tagList: [[] as string[]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private saveService: ArticleAdminFormService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  public cancelled(): void {
    this.routeOverview();
  }

  public saved(): void {
    this.saveService.saveArticle({
      ...this.contentForm.getRawValue(),
      ...this.metadataForm.value,
    }).pipe(
      take(1)
    ).subscribe(() => this.routeOverview());
  }

  private routeOverview() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });
  }

}
