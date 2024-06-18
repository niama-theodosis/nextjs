import * as LabelPrimitive from "@radix-ui/react-label"
import {Slot, SlotProps} from "@radix-ui/react-slot"
import {Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext} from "react-hook-form"

import {Label} from "@/components/ui/label"
import {HTMLAttributes, Ref, createContext, useContext, useId} from "react"
import {tv} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const FORM = tv({
  slots: {
    DESCRIPTION: `text-sm text-muted-foreground`,
    ITEM: `space-y-2`,
    LABEL: ``,
    MESSAGE: `text-sm font-medium text-destructive`,
  },
  variants: {
    error: {
      true: {LABEL: `text-destructive`},
    },
  },
})

const {DESCRIPTION, ITEM, LABEL, MESSAGE} = FORM()

// ROOT ************************************************************************************************************************************
export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

// FIELD ***********************************************************************************************************************************
const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

export const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{name: props.name}}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const {getFieldState, formState} = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) throw new Error("useFormField should be used within <FormField>")

  const {id} = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// ITEM ************************************************************************************************************************************
type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

export const FormItem = ({className, ...props}: FormItemProps) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{id}}>
      <div className={ITEM({className})} {...props} />
    </FormItemContext.Provider>
  )
}
export type FormItemProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// LABEL ***********************************************************************************************************************************
export const FormLabel = ({className, ...props}: FormLabelProps) => {
  const {error, formItemId} = useFormField()

  return <Label className={LABEL({error: !!error, className})} htmlFor={formItemId} {...props} />
}

export type FormLabelProps = LabelPrimitive.LabelProps

// CONTROL *********************************************************************************************************************************
export const FormControl = (props: FormControlProps) => {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}
export type FormControlProps = SlotProps

// DESCRIPTION *****************************************************************************************************************************
export const FormDescription = ({className, ...props}: FormDescriptionProps) => {
  const {formDescriptionId} = useFormField()

  return <p id={formDescriptionId} className={DESCRIPTION({className})} {...props} />
}
export type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {ref?: Ref<HTMLParagraphElement>}

// MESSAGE *********************************************************************************************************************************
export const FormMessage = ({className, children, ...props}: FormMessageProps) => {
  const {error, formMessageId} = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) return null

  return (
    <p id={formMessageId} className={MESSAGE({className})} {...props}>
      {body}
    </p>
  )
}
export type FormMessageProps = HTMLAttributes<HTMLParagraphElement> & {ref?: Ref<HTMLParagraphElement>}
