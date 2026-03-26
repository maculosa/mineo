import type { FieldDifinition, FieldEffect, FieldState, FormContext } from "./types";

export interface FormGraphOptions {
    fields: FieldDifinition[]
    effects?: FieldEffect[]
}

export function createFormGraph(options: FormGraphOptions) {
    const fieldMap = new Map<string, FieldState>()
    const effects = options.effects ?? []

    // 初始化字段
    for (const def of options.fields) {
        fieldMap.set(def.name, {
            name: def.name,
            value: def.initialValue ?? undefined,
            visible: def.visible ?? true,
            disabled: def.disabled ?? false,
            errors: [],
        })
    }

    const ctx: FormContext = {
        get(name) {
            const f = fieldMap.get(name)
            if (!f) {
                throw new Error(`[form-graph] Field not found: ${name}`)
            }
            return f
        },
        set(name, patch) {
            const f = fieldMap.get(name)
            if (!f) {
                throw new Error(`[form-graph] Field not found: ${name}`)
            }
            Object.assign(f, patch)
        },
        values() {
            const res: Record<string, any> = {}
            fieldMap.forEach((v, k) => {
                res[k] = v.value
            })
            return res
        },
    }

    function runEffects(source: string) {
        effects
          .filter(e => e.source === source)
          .forEach(e => {
            if (e.when(ctx)) {
                e.apply(ctx)
            }
          })
    }

    function setValue(name: string, value: any) {
        const field = fieldMap.get(name)
        if (!field) throw new Error(`[form-graph] Field not found: ${name}`)
        field.value = value
        runEffects(name)
    }

    return {
        getField(name: string) {
            return ctx.get(name)
        },
        setValue,
        values: ctx.values,
        fields() {
            return [...fieldMap.values()]
        }
    }
}