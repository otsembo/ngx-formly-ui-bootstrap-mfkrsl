import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
  return !control.value ||
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
      // https://regexr.com/3bfsi
      control.value as string
    )
    ? null
    : { password: true };
}

export function EmailValidator(control: AbstractControl): ValidationErrors | null {
  return !control.value ||
    /\b[\w.-]+@[\w.-]+\.\w{2,}\b/.test(control.value as string) // https://regexr.com/7i7ef
    ? null
    : { email: true };
}

export function MobileNoValidator(control: AbstractControl): ValidationErrors | null {
  return !control.value ||
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(
      control.value as string
    ) // https://regexr.com/38pvb
    ? null
    : { mobile_no: true };
}

export function PasswordConfirmationValidator(control: AbstractControl) {
  const { password, password_confirmation } = control.value as {
    password: string;
    password_confirmation: string;
  };
  // avoid displaying the message error when values are empty
  if (!password_confirmation || !password) {
    return null;
  }
  if (password_confirmation === password) {
    return null;
  }
  return { password_confirmation: true };
}
