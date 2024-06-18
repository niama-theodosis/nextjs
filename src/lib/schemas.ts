import {FieldErrors, FieldValues} from "react-hook-form"

// TYPES ***********************************************************************************************************************************
export type ActionState<D extends FieldValues> = {
  data?: D
  errors?: FieldErrors<D>
  status: ActionStatus
}

export type ActionStatus = "SUCCESS" | "INPUT_PARSE_ERROR" | "BAD_REQUEST" | "CONFLICT" | "INTERNAL_SERVER_ERROR"
