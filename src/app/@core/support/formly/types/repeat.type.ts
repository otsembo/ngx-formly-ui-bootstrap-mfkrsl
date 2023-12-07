/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
@Component({
  selector: 'formly-repeat-section',
  template: `
    <div class="mb-3">
      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>
      <div *ngFor="let field of field.fieldGroup; let i = index" class="row align-items-baseline">
        <formly-field class="col" [field]="field"></formly-field>
        <div *ngIf="props['removeText']"  class="col-1 d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary border-0" type="button" (click)="remove(i)"><i class="bx bx-x bx-sm"></i></button>
        </div>
      </div>
      <div *ngIf="props['addText']">
        <button class="btn btn-outline-secondary" type="button" (click)="add()">{{ props['addText'] }}</button>
      </div>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}
