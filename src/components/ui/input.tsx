import {InputHTMLAttributes, Ref} from "react"
import {tv} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const INPUT = tv({
  base: `flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background 
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive
  disabled:cursor-not-allowed disabled:opacity-50`,
})

// ROOT ************************************************************************************************************************************
export const Input = ({className, type, ...props}: InputProps) => <input type={type} className={INPUT({className})} {...props} />

// TYPES ***********************************************************************************************************************************
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {ref?: Ref<HTMLInputElement>}
