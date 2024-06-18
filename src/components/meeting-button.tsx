import {getServiceColor} from "@/lib/pocketbase/utils"
import Link from "next/link"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const MeetingButton = ({color, service, size, ...props}: MeetingButtonProps) => (
  <Button asChild size={size} color={color ?? getServiceColor(service)} {...props}>
    <Link href={`/rendez-vous${service ? "/" + service : ""}`}>
      <span className="i-lucide-calendar-heart h-4 w-4"></span>
      {size === "hybrid" && <span className="sr-only lg:not-sr-only lg:ml-2 lg:whitespace-nowrap">Prendre rendez-vous</span>}
      {size !== "hybrid" && size !== "icon" && <span className="ml-2">Prendre rendez-vous</span>}
    </Link>
  </Button>
)

// TYPES ***********************************************************************************************************************************
export type MeetingButtonProps = Omit<ButtonProps, "asChild" | "children"> & {service?: string}
