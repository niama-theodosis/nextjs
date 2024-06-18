"use client"

import {FallbackAlert} from "@/components/fallback-alert"
import {Submit} from "@/components/submit"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Toaster} from "@/components/ui/sonner"
import {defaultNewsletterValues, getNewsletterMessage, zNewsletterValues, type NewsletterValues} from "@/lib/utils"
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import {useActionState, useEffect, useMemo} from "react"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {subscribeToNewsletterAction} from "../actions"

// ROOT ************************************************************************************************************************************
export default function NewsletterForm() {
  const [[success, failure], action, pending] = useActionState(subscribeToNewsletterAction, [null, null])

  const message = useMemo(() => getNewsletterMessage([success, failure]), [success, failure])

  const form = useForm<NewsletterValues>({
    mode: "onTouched",
    resolver: zodResolver(zNewsletterValues),
    defaultValues: failure?.values ?? defaultNewsletterValues,
    errors: failure?.errors,
  })
  const {control, formState, handleSubmit, reset} = form

  useEffect(() => {
    const {code, description} = message ?? {}
    if (code === "SUCCESS" || code === "CONFLICT") reset()
    if (code) code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
  }, [message, reset])

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className="flex flex-col gap-8">
        <FormField
          control={control}
          name="email"
          render={({field}) => (
            <FormItem>
              <div className="flex w-full items-center">
                <FormControl>
                  <div className="group relative flex w-full items-center">
                    <span className="i-mdi-envelope absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Votre courriel..."
                      {...field}
                      className="rounded-r-none pl-9 group-aria-[invalid=true]:border-destructive group-aria-[invalid=true]:ring-destructive"
                    />
                  </div>
                </FormControl>
                <Submit pending={pending} label="Je m'inscris" icon="i-mdi-register" className="rounded-l-none" />
              </div>
              <FormDescription>
                La protection de vos données est
                <Button asChild variant="link" className="h-auto px-1 py-0">
                  <Link href="/mentions-legales">ma priorité.</Link>
                </Button>
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </form>
      <FallbackAlert message={message} />
      <Toaster richColors />
    </Form>
  )
}
