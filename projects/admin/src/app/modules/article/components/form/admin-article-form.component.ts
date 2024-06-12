import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonInputComponent } from 'common/forms/input';
import { CommonRichtextEditorComponent } from 'common/forms/richtext';
import { CommonFormStepComponent, CommonFormStepperComponent } from 'common/forms/stepper';
import { CommonTagInputComponent } from 'common/forms/tag-input';
import { filter, switchMap, take } from 'rxjs';
import { articleUrl, slug } from '../../../../core/constants/admin-url.constants';
import { ArticleAdminReadService } from '../../services/admin-article-read.service';
import { ArticleAdminSaveService } from '../../services/admin-article-save.service';

@Component({
  selector: 'admin-article-form',
  templateUrl: './admin-article-form.component.html',
  styleUrl: './admin-article-form.component.scss',
  standalone: true,
  providers: [
    ArticleAdminReadService,
    ArticleAdminSaveService,
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
export class AdminArticleFormComponent implements OnInit {

  public contentForm = this.fb.nonNullable.group({
    slug: [''],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]]
  });

  public metadataForm = this.fb.group({
    description: [''],
    tagList: [[] as string[]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private saveService: ArticleAdminSaveService,
    private readService: ArticleAdminReadService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        filter(params => !!params[slug]),
        switchMap(params => this.readService.getArticle(params[slug])),
        take(1)
      ).subscribe(article => {

        this.contentForm.patchValue({
          slug: article.slug,
          body: article.body,
          title: article.title,
        });

        this.metadataForm.patchValue({
          description: article.description,
          tagList: article.tagList,
        });
      });
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
    this.router.navigate([articleUrl]);
  }

}
