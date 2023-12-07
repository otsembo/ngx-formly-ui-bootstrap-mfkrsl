/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-interface */
// https://github.com/ngx-formly/ngx-formly/blob/main/src/ui/bootstrap/checkbox/src/checkbox.type.ts
import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';

interface CheckboxProps extends FormlyFieldProps {
  formCheck?: 'default' | 'inline' | 'switch' | 'inline-switch' | 'nolabel';
  indeterminate?: boolean;
}

export interface FormlyCheckboxFieldConfig extends FormlyFieldConfig<CheckboxProps> {
  type: 'checkbox' | Type<FormlyFieldCheckbox>;
}

@Component({
  selector: 'formly-field-checkbox',
  template: `
    <ng-template #fieldTypeTemplate>
      <div
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [class.is-invalid]="showError"
          class="form-check-input"
          [class.position-static]="props.formCheck === 'nolabel'"
          [indeterminate]="props.indeterminate && formControl.value === null"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
        <label *ngIf="props.formCheck !== 'nolabel'" [for]="id" class="form-check-label">
          <span [innerHTML]="props.label || '' | safe : 'html'"></span>
          <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
        </label>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCheckbox extends FieldType<FieldTypeConfig<CheckboxProps>> {
  override defaultOptions = {
    props: {
      indeterminate: true,
      hideLabel: true,
      formCheck: 'default' as const,
    },
  };
}