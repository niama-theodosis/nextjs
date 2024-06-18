import { Ref, type HTMLAttributes } from "react"
import { tv, type VariantProps } from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const BADGE = tv({
  base: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors 
  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
  variants: {
    variant: {
      accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      tertiary: "border-transparent bg-tertiary text-tertiary-foreground hover:bg-tertiary/80",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "accent",
  },
})

// ROOT ************************************************************************************************************************************
export const Badge = ({className, variant, ...props}: BadgeProps) => <div className={BADGE({variant, className})} {...props} />

// TYPES ***********************************************************************************************************************************
export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof BADGE> & {ref?: Ref<HTMLDivElement>}
