/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
// grid-wrapper.component.ts
import { Component} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-grid',
  template: `
    <div class="field-grid">
        <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class FormlyWrapperGrid extends FieldWrapper {
}