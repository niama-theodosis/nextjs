import { Ref, type HTMLAttributes } from "react"
import { tv } from "tailwind-variants"
import { HEADING } from "./typography"

// STYLES **********************************************************************************************************************************
export const CARD = tv({
  slots: {
    CONTENT: "flex-1 flex flex-col gap-4",
    DESCRIPTION: "text-sm text-muted-foreground",
    FOOTER: "flex items-center gap-1.5",
    HEADER: "flex flex-col gap-1.5",
    ROOT: "flex flex-col gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm",
    TITLE: HEADING({level: 3}),
  },
})
const {CONTENT, DESCRIPTION, FOOTER, HEADER, ROOT, TITLE} = CARD()

// CONTENT *********************************************************************************************************************************
export const CardContent = ({className, ...props}: CardContentProps) => <div className={CONTENT({className})} {...props} />
export type CardContentProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// DESCRIPTION *****************************************************************************************************************************
export const CardDescription = ({className, ...props}: CardDescriptionProps) => <p className={DESCRIPTION({className})} {...props} />
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {ref?: Ref<HTMLParagraphElement>}

// FOOTER **********************************************************************************************************************************
export const CardFooter = ({className, ...props}: CardFooterProps) => <div className={FOOTER({className})} {...props} />
export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// HEADER **********************************************************************************************************************************
export const CardHeader = ({className, ...props}: CardHeaderProps) => <div className={HEADER({className})} {...props} />
export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// ROOT ************************************************************************************************************************************
export const Card = ({className, ...props}: CardProps) => <div className={ROOT({className})} {...props} />
export type CardProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// TITLE ***********************************************************************************************************************************
export const CardTitle = ({className, ...props}: CardTitleProps) => <h3 className={TITLE({className})} {...props} />
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {ref?: Ref<HTMLHeadingElement>}