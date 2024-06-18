"use client"

import {cn} from "@/lib/utils"
import * as P from "@radix-ui/react-accordion"
import {Ref} from "react"
import {tv, type VariantProps} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const ACCORDION = tv({
  slots: {
    TRIGGER: `text-gray-600 text-lg font-heading flex flex-1 items-center justify-between py-4 font-bold transition-all 
   [&[data-state=open]>svg]:rotate-180`,
  },
  variants: {
    variant: {
      primary: {TRIGGER: `hover:text-primary`},
      secondary: {TRIGGER: `hover:text-secondary`},
    },
  },
  defaultVariants: {
    variant: "secondary",
  },
})

const {TRIGGER} = ACCORDION()

// ROOT ************************************************************************************************************************************
export const Accordion = P.Root

// ITEM ************************************************************************************************************************************
export const AccordionItem = ({className, ...props}: AccordionItemProps) => <P.Item className={cn("border-b", className)} {...props} />
export type AccordionItemProps = P.AccordionItemProps & {ref?: Ref<HTMLDivElement>}

// TRIGGER *********************************************************************************************************************************
export const AccordionTrigger = ({className, children, ref, variant, ...props}: AccordionTriggerProps) => (
  <P.Header className="flex">
    <P.Trigger ref={ref} className={TRIGGER({variant, className})} {...props}>
      {children}
      <span className="i-lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"></span>
    </P.Trigger>
  </P.Header>
)
export type AccordionTriggerProps = P.AccordionTriggerProps & VariantProps<typeof TRIGGER> & {ref?: Ref<HTMLButtonElement>}

// CONTENT *********************************************************************************************************************************
export const AccordionContent = ({className, children, ...props}: AccordionContentProps) => (
  <P.Content
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </P.Content>
)
export type AccordionContentProps = P.AccordionContentProps & {ref?: Ref<HTMLDivElement>}
