import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  FieldErrors,
  FormErrorsObject,
} from '../@core/support/formly/formly.interface';
import { Alert } from '../@core/support/ui.interface';
import { ToSentencePipe } from '../pipes/to-sentence.pipe';
import { Location } from '@angular/common';
import { overrideObjectArrayById } from '../@core/support/helpers';
import { FormConfigOverride } from './form.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  constructor(private toSentence: ToSentencePipe, private location: Location) {}

  @Input() form = new FormGroup({});
  @Input() fields!: FormlyFieldConfig[];
  @Input() model!: Record<string, unknown>;
  @Input() options: FormlyFormOptions = {};
  @Input() overrides?: FormConfigOverride[];
  @Input() canSubmit = true;
  @Input() submitClass = 'btn btn-primary shadow-primary';
  @Input() submitLabel = 'Submit';
  @Input() formAlert?: Alert;
  @Input() canCancel?: boolean;
  @Input() cancelClass = 'btn btn-outline-secondary';
  @Input() cancelLabel = 'Cancel';

  _apiErrors?: FormErrorsObject;
  @Input()
  set apiErrors(value: FormErrorsObject | undefined) {
    if (value){
      value = {...value}
      this.assignErrors(value)
    }
    this._apiErrors = value;
  }
  get apiErrors() {
    return this._apiErrors as FormErrorsObject;
  }
  @Output() params = new EventEmitter<object>();

  ngOnInit(): void {
    this.overrideFormConfig()
  }

  onSubmit() {
    this.formAlert = undefined;
    this.form.setErrors(null);
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formValue = this.buildFormData(this.form.value)
      this.params.emit(formValue);
    }
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  assignErrors(formErrors: FormErrorsObject): void {
    this.assignFormErrors(formErrors.resource as string[]);
    this.assignFieldErrors(formErrors.attributes as FieldErrors);
  }

  goBack() {
    this.location.back()
  }

  private overrideFormConfig(){
    if (this.overrides){
      this.overrides.flatMap(overrideObject=>{
        return overrideObjectArrayById(
          overrideObject.id,
          overrideObject.override,
          this.fields
        );
      })
    }
  }

  private assignFormErrors(formErrors: string[]) {
    if (formErrors.length !== 0) {
      this.formAlert = {
        message: this.toSentence.transform(formErrors),
        type: 'danger',
      };
    }
  }

  private assignFieldErrors(fieldErrors: FieldErrors) {
    Object.keys(fieldErrors).forEach((fieldName) => {
      const field = this.form.get(fieldName);
      if (field) {
        field.setErrors({
          api: this.toSentence.transform(fieldErrors[fieldName]),
        });
      }
    });
  }

  private buildFormData(formValue: Partial<object>) {
    const formId = this.model['id']
      if (formId){
        formValue = {id: formId, ...formValue}
      }
      return formValue
  }
}
