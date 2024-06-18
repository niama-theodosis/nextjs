"use server"

import {resend} from "@/lib/resend"
import {formAction, zContactValues} from "@/lib/utils"
import {z} from "zod"
import {ZSAError} from "zsa"

// SEND EMAIL ******************************************************************************************************************************
export const sendEmailAction = formAction
  .input(zContactValues, {type: "state"})
  .output(z.boolean())
  .handler(async ({input: {email, forename, message, surname}}) => {
    const {error} = await resend.emails.send({
      from: "contact@theodosis.fr",
      to: "niama.theodosis@gmail.com",
      subject: "Formulaire de contact",
      html: `<dl><dt>Nom :</dt><dd>${forename} ${surname}</dd><dt>Courriel :</dt><dd>${email}</dd><dt>Message :</dt><dd>${message}</dd></dl>`,
    })
    if (error) throw new ZSAError("INTERNAL_SERVER_ERROR")
    return true
  })
