import {env} from "@/env/server"
import {Resend} from "resend"

// CLIENT **********************************************************************************************************************************
export const resend = new Resend(env.RESEND_API_KEY)
