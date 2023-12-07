import { FormlyFieldConfig } from "@ngx-formly/core"

export interface FormConfigOverride {
    id: string
    override: FormlyFieldConfig
}

export type FormInputContext = { selected: boolean, immutable: boolean };