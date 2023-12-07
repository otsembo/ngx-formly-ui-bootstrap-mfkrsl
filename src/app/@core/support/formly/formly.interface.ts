import { FormlyFieldInput } from './types/input.type';
import { FormlyWrapperFormField } from './wrappers/form-field.wrapper';
import { APIValidatorMessage } from './form-validator-messages';
import { EmailValidator, MobileNoValidator, PasswordConfirmationValidator, PasswordValidator } from './form-validators';
import { RepeatTypeComponent } from './types/repeat.type';
import { FormlyFieldCheckbox } from './types/checkbox.type';
import { FormlyWrapperGrid } from './wrappers/grid.wrapper';

export interface FormErrorsObject {
  resource?: string[];
  attributes?: FieldErrors;
}

export interface FieldErrors {
  [key: string]: string[];
}

export const FORMLY_INIT = {
  types: [
    { name: 'input', component: FormlyFieldInput },
    { name: 'checkbox', component: FormlyFieldCheckbox },
    { name: 'repeat', component: RepeatTypeComponent },
  ],
  wrappers: [
    { name: 'form-field', component: FormlyWrapperFormField },
    { name: 'grid', component: FormlyWrapperGrid },
  ],
  validators: [
    { name: 'password', validation: PasswordValidator },
    { name: 'email', validation: EmailValidator },
    {
      name: 'password_confirmation',
      validation: PasswordConfirmationValidator,
    },
    { name: 'mobile_no', validation: MobileNoValidator },
  ],
  validationMessages: [
    { name: 'required', message: 'This field is required' },
    {
      name: 'password',
      message:
        'Password requires at least one of: uppercase, lower case, number and symbol',
    },
    { name: 'email', message: 'Email format is invalid' },
    { name: 'password_confirmation', message: 'Password does not match' },
    { name: 'mobile_no', message: 'Mobile No format is invalid' },
    { name: 'api', message: APIValidatorMessage },
  ],
};


