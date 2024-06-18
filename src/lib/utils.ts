import {clsx, type ClassValue} from "clsx"
import {FieldErrors, FieldValues} from "react-hook-form"
import {twMerge} from "tailwind-merge"
import {z} from "zod"
import {ZSAError, createServerActionProcedure} from "zsa"

// STYLES **********************************************************************************************************************************
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// FORM ************************************************************************************************************************************
export const formAction = createServerActionProcedure()
  .experimental_shapeError(({err, typedData}) => {
    const values = Object.fromEntries(Object.entries(typedData.inputRaw).filter(([name]) => !name.startsWith("$ACTION")))
    if (!(err instanceof ZSAError)) return {code: "INTERNAL_SERVER_ERROR" as const, errors: {root: {type: "INTERNAL_SERVER_ERROR"}}, values}
    const {code, inputParseErrors, message} = err
    const errors = {
      root: {type: code, message: message ?? inputParseErrors?.formErrors?.[0]},
      ...Object.fromEntries(Object.entries(inputParseErrors?.fieldErrors ?? {}).map(([name, errors]) => [name, {message: errors?.[0]}])),
    }
    return {code, errors, values}
  })
  .handler(() => {})
  .createServerAction()

export function getMessageFor(i18n: MessageI18n) {
  const descriptions = new Map(Object.entries(i18n))
  return <S, V extends FieldValues>([success, failure]: [S | null, Failure<V> | null]): Message | undefined => {
    if (!!success) return {code: "SUCCESS", description: i18n.SUCCESS}
    if (failure && failure.code !== "INPUT_PARSE_ERROR") return {code: failure.code, description: descriptions.get(failure.code)!}
  }
}

// CONTACT *********************************************************************************************************************************
export const zContactValues = z.object({
  email: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
  forename: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis"),
  message: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis"),
  surname: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis"),
})
export type ContactValues = z.infer<typeof zContactValues>

export const defaultContactValues: ContactValues = {email: "", forename: "", message: "", surname: ""}

export const getContactMessage = getMessageFor({
  INTERNAL_SERVER_ERROR: "Veuillez réessayer ultérieurement.",
  SUCCESS: "Votre message a été envoyé avec succès.",
})

// NEWSLETTER ******************************************************************************************************************************
export const zNewsletterValues = z.object({
  email: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
})
export type NewsletterValues = z.infer<typeof zNewsletterValues>

export const defaultNewsletterValues: NewsletterValues = {email: ""}

export const getNewsletterMessage = getMessageFor({
  CONFLICT: "Vous êtes déjà inscrit·e.",
  INTERNAL_SERVER_ERROR: "Veuillez réessayer ultérieurement.",
  SUCCESS: "Veuillez valider votre inscription dans le courriel reçu.",
})

// TYPES ***********************************************************************************************************************************
export type MessageI18n = {SUCCESS: string} & {[key in ZSAError["code"]]?: string}
export type Message = {code: ZSAError["code"] | "SUCCESS"; description: string}
export type Failure<V extends FieldValues = FieldValues> = {code: ZSAError["code"]; errors: FieldErrors<V>; values?: V}
