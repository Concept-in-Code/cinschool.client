import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'common-richtext-editor',
  templateUrl: './common-richtext-editor.component.html',
  styleUrls: ['./common-richtext-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CommonRichtextEditorComponent,
      multi: true
    }
  ],
  standalone: true,
  imports: [
    CKEditorModule,
  ]
})
export class CommonRichtextEditorComponent implements ControlValueAccessor {

  @Input()
  public config: EditorConfig = {
    toolbar: [
      'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'undo', 'redo'
    ]
  };

  public Editor = ClassicEditor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public editorInstance: any;

  public model = {
    editorData: ''
  }

  private onChange?: (value: string) => void;
  private onTouch?: () => void;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  public writeValue(value: string): void {
    this.model.editorData = value;
    this.cdr.detectChanges();
  }

  public registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public handleEditorReady(editor: unknown): void {
    this.editorInstance = editor;
  }

  public handleEditorChange(): void {
    this.onTouch?.();
    this.onChange?.(
      this.editorInstance.getData()
    );
  }

}
