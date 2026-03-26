export interface FieldState {
    name: string
    value: any
    visible: boolean
    disabled: boolean
    errors: string[]
}

export interface FormContext {
    get(name: string): FieldState
    set(name: string, patch: Partial<FieldState>): void
    values(): Record<string, any>
}

export interface FieldEffect {
    source: string
    targets: string[]
    when: (ctx: FormContext) => boolean
    apply: (ctx: FormContext) => void
}

export interface FieldDifinition {
    name: string
    initialValue?: any
    visible?: boolean
    disabled?: boolean
}