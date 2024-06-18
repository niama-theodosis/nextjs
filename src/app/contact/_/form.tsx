"use client"

import {Submit} from "@/components/submit"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
// import {env} from "@/env"
import {zodResolver} from "@hookform/resolvers/zod"
// import {Turnstile} from "@marsidev/react-turnstile"
import {FallbackAlert} from "@/components/fallback-alert"
import {Toaster} from "@/components/ui/sonner"
import {ContactValues, defaultContactValues, getContactMessage, zContactValues} from "@/lib/utils"
import {useEffect, useMemo} from "react"
import {useFormState} from "react-dom"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {sendEmailAction} from "../actions"

// CONSTS **********************************************************************************************************************************
const messages = {
  SUCCESS: "Votre message a été envoyé avec succès",
  BAD_REQUEST: "Une erreur est survenue",
  INPUT_PARSE_ERROR: "Veuillez corriger les erreurs ci-dessus",
}

// ROOT ************************************************************************************************************************************
export default function ContactForm() {
  const [[success, failure], action, pending] = useFormState(sendEmailAction, [null, null])

  const message = useMemo(() => getContactMessage([success, failure]), [success, failure])

  const form = useForm<ContactValues>({
    mode: "onTouched",
    resolver: zodResolver(zContactValues),
    defaultValues: failure?.values ?? defaultContactValues,
    errors: failure?.errors,
  })
  const {control, formState, handleSubmit, reset} = form

  useEffect(() => {
    const {code, description} = message ?? {}
    if (code === "SUCCESS") reset()
    if (code) code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
  }, [message, reset])

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={control}
            name="forename"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom..." {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="surname"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom..." {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Votre courriel</FormLabel>
              <FormControl>
                <Input placeholder="Votre courriel..." {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="message"
          render={({field}) => (
            <FormItem>
              <FormLabel>Votre message</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre message..." {...field} rows={8} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        {/* <Turnstile siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} options={{responseFieldName: "captcha", size: "invisible"}} /> */}
        <Submit pending={pending} label="Envoyer" icon="i-lucide-send" className="self-end text-base" />
      </form>
      <FallbackAlert message={message} />
      <Toaster richColors />
    </Form>
  )
}
