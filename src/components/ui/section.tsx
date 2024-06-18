import { Ref, type HTMLAttributes } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { HEADING } from "./typography"

// STYLES **********************************************************************************************************************************
export const SECTION = tv({
  slots: {
    ASIDE: `SECTION_ASIDE grid grid-cols-12 col-span-12 
    lg:col-span-5`,
    CONTENT: `SECTION_CONTENT grid container mx-auto space-y-8 grid-cols-12
    lg:space-x-8 lg:space-y-0`,
    HEADER: `SECTION_HEADER flex flex-col gap-4 text-center max-w-2xl mx-auto`,
    MAIN: `SECTION_MAIN flex flex-col gap-8 col-span-12 
    lg:col-span-7 lg:only:col-span-12`,
    ROOT: `SECTION flex flex-col py-16 w-full`,
    TITLE: "SECTION_TITLE",
    TAGLINE: `SECTION_TAGLINE text-gray-600 text-lg`,
  },
  variants: {
    level: {
      1: {TITLE: HEADING({level: 1})},
      2: {TITLE: HEADING({level: 2})},
      3: {TITLE: HEADING({level: 3})},
      4: {TITLE: HEADING({level: 4})},
      5: {TITLE: HEADING({level: 5})},
      6: {TITLE: HEADING({level: 6})},
    },
    variant: {
      default: {ROOT: `bg-white`},
      accent: {ROOT: `bg-accent`},
    },
  },
  defaultVariants: {
    level: 2,
    variant: "accent",
  },
})

export const {ASIDE, CONTENT, HEADER, MAIN, ROOT, TAGLINE, TITLE} = SECTION()

// ASIDE ***********************************************************************************************************************************
export const SectionAside = ({className, ...props}: SectionAsideProps) => <aside className={ASIDE({className})} {...props} />
export type SectionAsideProps = HTMLAttributes<HTMLElement> & {ref?: Ref<HTMLElement>}

// ROOT ************************************************************************************************************************************
export const Section = ({className, variant, ...props}: SectionProps) => <section className={ROOT({variant, className})} {...props} />
export type SectionProps = HTMLAttributes<HTMLElement> & VariantProps<typeof SECTION> & {ref?: Ref<HTMLElement>}

// CONTENT *********************************************************************************************************************************
export const SectionContent = ({className, ...props}: SectionContentProps) => <div className={CONTENT({className})} {...props} />
export type SectionContentProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// HEADER **********************************************************************************************************************************
export const SectionHeader = ({className, ...props}: SectionHeaderProps) => <div className={HEADER({className})} {...props} />
export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// MAIN ************************************************************************************************************************************
export const SectionMain = ({className, ...props}: SectionMainProps) => <main className={MAIN({className})} {...props} />
export type SectionMainProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}

// TAGLINE *********************************************************************************************************************************
export const SectionTagline = ({className, ...props}: SectionTaglineProps) => <p className={TAGLINE({className})} {...props} />
export type SectionTaglineProps = HTMLAttributes<HTMLParagraphElement> & {ref?: Ref<HTMLParagraphElement>}

// TITLE ***********************************************************************************************************************************
export const SectionTitle = ({className, level, ...props}: SectionTitleProps) => <h2 className={TITLE({level, className})} {...props} />
export type SectionTitleProps = HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof SECTION> & {ref?: Ref<HTMLHeadingElement>}
