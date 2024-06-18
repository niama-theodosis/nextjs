import * as P from "@radix-ui/react-navigation-menu"

import {cn} from "@/lib/utils"
import {Ref} from "react"
import {tv} from "tailwind-variants"

// ROOT ************************************************************************************************************************************
export const NavigationMenu = ({className, children, ...props}: NavigationMenuProps) => (
  <P.Root className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
    {children}
    <NavigationMenuViewport />
  </P.Root>
)
export type NavigationMenuProps = P.NavigationMenuProps & {ref?: Ref<HTMLElement>}

// LIST ************************************************************************************************************************************
export const NavigationMenuList = ({className, ...props}: NavigationMenuListProps) => (
  <P.List className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props} />
)
export type NavigationMenuListProps = P.NavigationMenuListProps & {ref?: Ref<HTMLUListElement>}

// ITEM ************************************************************************************************************************************
export const NavigationMenuItem = P.Item

// TRIGGER *********************************************************************************************************************************
export const navigationMenuTriggerStyle = tv({
  base: `group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
  hover:bg-accent hover:text-accent-foreground focus:bg-accent 
  focus:text-accent-foreground focus:outline-none 
  disabled:pointer-events-none disabled:opacity-50 
  data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`,
})

export const NavigationMenuTrigger = ({className, children, ...props}: NavigationMenuTriggerProps) => (
  <P.Trigger className={cn(navigationMenuTriggerStyle(), "group", className)} {...props}>
    {children}
    <span
      className="i-lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </P.Trigger>
)
export type NavigationMenuTriggerProps = P.NavigationMenuTriggerProps & {ref?: Ref<HTMLButtonElement>}

// CONTENT *********************************************************************************************************************************
export const NavigationMenuContent = ({className, ...props}: NavigationMenuContentProps) => (
  <P.Content
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
)
export type NavigationMenuContentProps = P.NavigationMenuContentProps & {ref?: Ref<HTMLDivElement>}

// LINK ************************************************************************************************************************************
export const NavigationMenuLink = P.Link

// VIEWPORT ********************************************************************************************************************************
export const NavigationMenuViewport = ({className, ...props}: NavigationMenuViewportProps) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <P.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      {...props}
    />
  </div>
)
export type NavigationMenuViewportProps = P.NavigationMenuViewportProps & {ref?: Ref<HTMLDivElement>}

// INDICATOR *******************************************************************************************************************************
export const NavigationMenuIndicator = ({className, ...props}: NavigationMenuIndicatorProps) => (
  <P.Indicator
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </P.Indicator>
)
export type NavigationMenuIndicatorProps = P.NavigationMenuIndicatorProps & {ref?: Ref<HTMLDivElement>}
