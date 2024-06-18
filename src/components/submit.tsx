import {cn} from "@/lib/utils"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const Submit = ({className, icon, label, pending, ...props}: SubmitProps) => {
  // const {pending} = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className={cn("flex gap-2", className)} {...props}>
      <span className={cn("h-4 w-4", pending ? "i-lucide-loader animate-spin" : icon)}></span>
      <span>{label}</span>
    </Button>
  )
}

// TYPES ***********************************************************************************************************************************
export type SubmitProps = Omit<ButtonProps, "asChild" | "children" | "type" | "disabled"> & {icon: string; label: string; pending: boolean}
