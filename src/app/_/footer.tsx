import {SocialButtons} from "@/components/social-buttons"
import {cn} from "@/lib/utils"
import Link from "next/link"
import {Ref, type HTMLAttributes} from "react"

// ROOT ************************************************************************************************************************************
export const Footer = ({className, ...props}: FooterProps) => (
  <footer className={cn("bg-tertiary text-tertiary-foreground", className)} {...props}>
    <div className="container mx-auto flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between">
        <Link href="/mentions-legales">Mentions légales</Link>
        <SocialButtons className="sm:hidden" />
      </div>
      <div className="text-center text-xs sm:text-sm">Copyright © 2024 Theodosis. Tous droits réservés.</div>
    </div>
  </footer>
)

// TYPES ***********************************************************************************************************************************
export type FooterProps = HTMLAttributes<HTMLElement> & {ref?: Ref<HTMLElement>}
