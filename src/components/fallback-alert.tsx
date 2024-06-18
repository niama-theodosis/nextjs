"use client"

import {Message} from "@/lib/utils"
import {useEffect, useState} from "react"
import {Alert, AlertDescription, AlertTitle} from "./ui/alert"

// ROOT ************************************************************************************************************************************
export function FallbackAlert({message}: FallbackAlertProps) {
  const [noJs, setNoJs] = useState(true)

  useEffect(() => setNoJs(false), [])

  return (
    noJs &&
    message && (
      <Alert variant={message.code === "SUCCESS" ? "success" : "destructive"}>
        <AlertTitle>{message.code === "SUCCESS" ? "Succès" : "Erreur"}</AlertTitle>
        <AlertDescription>{message.description}</AlertDescription>
      </Alert>
    )
  )
}

// TYPES ***********************************************************************************************************************************
export type FallbackAlertProps = {message: Message | undefined}
