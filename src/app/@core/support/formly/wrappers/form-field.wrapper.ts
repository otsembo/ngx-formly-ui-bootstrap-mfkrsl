/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
// https://github.com/ngx-formly/ngx-formly/blob/main/src/ui/bootstrap/form-field/src/form-field.wrapper.ts

import { Component } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps as CoreFormlyFieldProps } from '@ngx-formly/core';

export interface FormlyFieldProps extends CoreFormlyFieldProps {
  hideLabel?: boolean;
  hideRequiredMarker?: boolean;
  labelPosition?: 'floating';
  popover?: {
    position?: 'start' | 'end' | 'top' | 'bottom' ;
    message?: string;
    trigger?: 'hover' | 'click';
  };
}

@Component({
  selector: 'formly-wrapper-form-field',
  template: `
    <ng-template #labelTemplate>
      <label *ngIf="props.label && props.hideLabel !== true" [attr.for]="id" class="form-label fs-base d-flex">
        <span [innerHTML]="props.label | safe : 'html'"></span>
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true" style="color: red;">*</span>
        <span *ngIf="props.popover"
        placement="{{ props.popover.position }}"
        ngbPopover="{{ props.popover.message }}"
        triggers="{{ props.popover.trigger }}">
        <i class='bx bx-info-circle text-muted ms-1' ></i>
        </span>
      </label>
    </ng-template>
    <div class="mb-3 position-relative" [class.form-floating]="props.labelPosition === 'floating'" [class.has-error]="showError">
      <ng-container *ngIf="props.labelPosition !== 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>
      <ng-template #fieldComponent></ng-template>
      <ng-container *ngIf="props.labelPosition === 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>
      <div *ngIf="showError" class="invalid-feedback position-absolute start-0 top-100" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <small *ngIf="props.description" class="form-text text-muted">{{ props.description }}</small>
    </div>
  `,
})
export class FormlyWrapperFormField extends FieldWrapper<FormlyFieldConfig<FormlyFieldProps>> {}