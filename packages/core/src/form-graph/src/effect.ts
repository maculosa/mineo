import type { FieldEffect, FormContext } from "./types";

export function effect(source: string) {
    let whenFn: (ctx: FormContext) => boolean = () => true

    return {
        when(fn: (ctx: FormContext) => boolean) {
            whenFn = fn
            return this
        },
        show(...targets: string[]): FieldEffect {
            return createEffect(source, targets, whenFn, ctx => {
                targets.forEach(t => ctx.set(t, { visible: true }))
            })
        },
        hide(...targets: string[]): FieldEffect {
            return createEffect(source, targets, whenFn, ctx => {
                targets.forEach(t => ctx.set(t, { visible: false }))
            })
        },
        enable(...targets: string[]): FieldEffect {
            return createEffect(source, targets, whenFn, ctx => {
                targets.forEach(t => ctx.set(t, { disabled: false }))
            })
        },
        disable(...targets: string[]): FieldEffect {
            return createEffect(source, targets, whenFn, ctx => {
                targets.forEach(t => ctx.set(t, { disabled: true }))
            })
        },
    }
}

function createEffect(
    source: string,
    targets: string[],
    when: (ctx: FormContext) => boolean,
    apply: (ctx: FormContext) => void
): FieldEffect {
    return {
        source,
        targets,
        when,
        apply,
    }
}
