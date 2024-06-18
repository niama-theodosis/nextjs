import { cn } from "@/lib/utils"
import { HTMLAttributes, Ref } from "react"

// ROOT ************************************************************************************************************************************
export function Skeleton({className, ...props}: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}
export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}