import {TextareaHTMLAttributes} from "react"
import {tv} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
const TEXTAREA = tv({
  base: `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive
  disabled:cursor-not-allowed disabled:opacity-50`,
})

// ROOT ************************************************************************************************************************************
export const Textarea = ({className, ...props}: TextareaProps) => <textarea className={TEXTAREA({className})} {...props} />
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {ref?: React.Ref<HTMLTextAreaElement>}
