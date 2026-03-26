import type { FieldDifinition } from "./types";

export function field(name: string) {
    const def: FieldDifinition = {
        name,
        visible: true,
        disabled: false,
    }

    return {
        initial(value: any) {
            def.initialValue = value
            return this
        },
        hidden() {
            def.visible = false
            return this
        },
        disabled() {
            def.disabled = true
            return this
        },
        build(): FieldDifinition {
            return def
        }
    }
}
