import { Ref, type HTMLAttributes } from "react"
import { tv } from "tailwind-variants"

// STYLES **********************************************************************************************************************************
const PROSE = tv({base: "prose prose-headings:font-heading max-w-none text-justify"})

// ROOT ************************************************************************************************************************************
export const Prose = ({children, className, ...props}: ProseProps) => (
  <article className={PROSE({className})} {...props}>
    {children}
  </article>
)

// TYPES ***********************************************************************************************************************************
export type ProseProps = HTMLAttributes<HTMLElement> & {ref?: Ref<HTMLElement>}
