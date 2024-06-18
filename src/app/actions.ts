"use server"

import {subscribeToNewsletter} from "@/lib/hashnode"
import {formAction, zNewsletterValues} from "@/lib/utils"
import {z} from "zod"
import {ZSAError} from "zsa"

// SUBSCRIBE TO NEWSLETTER ***************************************************************************************************************
export const subscribeToNewsletterAction = formAction
  .experimental_shapeError(({ctx: {code, errors, values}}) => (code === "CONFLICT" ? {code, errors} : {code, errors, values}))
  .input(zNewsletterValues, {type: "state"})
  .output(z.boolean())
  .handler(async ({input: {email}}) => {
    const code = await subscribeToNewsletter(email)
    if (code !== "SUCCESS") throw new ZSAError(code)
    return true
  })
