import { FormlyFieldConfig } from "@ngx-formly/core";

export function APIValidatorMessage(error: unknown, field: FormlyFieldConfig) {
    const message:  string = field.formControl?.errors?.['api'] as string
    const fieldName: string = field.props?.label || 'This field'
    return `${fieldName} ${message}`
}