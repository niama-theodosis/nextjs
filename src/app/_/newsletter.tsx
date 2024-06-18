import {Prose} from "@/components/ui/prose"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {fetchHome} from "@/lib/pocketbase"
import NewsletterForm from "./newsletter-form"

// ROOT ************************************************************************************************************************************
export async function HomeNewsletter() {
  const {newsletter} = await fetchHome()
  const {content, tagline, title} = newsletter

  return (
    <Section>
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{tagline}</SectionTagline>
          </SectionHeader>
          <Prose dangerouslySetInnerHTML={{__html: content}} />
          <div className="mx-auto w-full max-w-2xl space-y-4">
            <NewsletterForm />
          </div>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
