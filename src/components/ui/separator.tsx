"use client"

import * as P from "@radix-ui/react-separator"

import {cn} from "@/lib/utils"
import {Ref} from "react"

// ROOT ************************************************************************************************************************************
export const Separator = ({className, orientation = "horizontal", decorative = true, ...props}: SeparatorProps) => (
  <P.Root
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
)

export type SeparatorProps = P.SeparatorProps & {ref?: Ref<HTMLDivElement>}
