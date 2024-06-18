import Link from "next/link"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const MoreButton = ({href, label = "En savoir plus", ...props}: MoreButtonProps) => (
  <Button asChild {...props}>
    <Link href={href}>
      <span>{label}</span>
      <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
    </Link>
  </Button>
)

// TYPES ***********************************************************************************************************************************
export type MoreButtonProps = Omit<ButtonProps, "asChild" | "children"> & {href: string; label?: string}
