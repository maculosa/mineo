import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Typography } from "./Typography.vue"

export const typographyVariants = cva(
    '',
    {
        variants: {
            tag: {
                h1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
                h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
                h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
                h4: "scroll-m-20 text-xl font-semibold tracking-tight",
                p: "leading-7",
                span: "inline-block",
                blockquote: "border-l-2 pl-6 italic",
                list: "my-6 ml-6 list-disc",
                lead: "text-xl text-muted-foreground",
                muted: "text-sm text-muted-foreground",
                large: "text-lg font-semibold",
                small: "text-sm font-medium leading-none",
                code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
            },
            color: {
                default: '',
                primary: 'text-primary',
                secondary: 'text-secondary-foreground',
                muted: 'text-muted-foreground',
                accent: 'text-accent-foreground',
                destructive: 'text-destructive',
            },
            align: {
                default: '',
                left: 'text-left',
                right: 'text-right',
                center: 'text-center',
            },
        },
        defaultVariants: {
            tag: "p"
        }
    }
)

export type TypographyVariants = VariantProps<typeof typographyVariants>
