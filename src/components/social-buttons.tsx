import { Button } from "@/components/ui/button"
import { env } from "@/env/server"
import { hashnode } from "@/lib/hashnode"
import { graphql } from "@/lib/hashnode/graphql"
import { cn } from "@/lib/utils"
import { Ref, cache, type HTMLAttributes } from "react"

// GQL *************************************************************************************************************************************
export const SocialsQuery = graphql(`
  query Socials($host: String!) {
    publication(host: $host) {
      author {
        socialMediaLinks {
          facebook
          instagram
          youtube
        }
      }
    }
  }
`)

const fetchSocials = cache(async () => {
  const {publication} = await hashnode.request(SocialsQuery, {host: env.HASHNODE_PUBLICATION_HOST})
  return [
    {id: "instagram", icon: "i-lucide-instagram", url: publication?.author.socialMediaLinks?.instagram},
    {id: "youtube", icon: "i-lucide-youtube", url: publication?.author.socialMediaLinks?.youtube},
    {id: "facebook", icon: "i-lucide-facebook", url: publication?.author.socialMediaLinks?.facebook},
  ]
})

// ROOT ************************************************************************************************************************************
export const SocialButtons = async ({className, ...props}: SocialButtonsProps) => {
  const socials = await fetchSocials()

  return (
    <div className={cn("flex items-center gap-1 lg:gap-2", className)} {...props}>
      {socials.map(({icon, id, url}) => (
        <Button key={id} size="icon" asChild>
          <a href={url ?? ""} target="_blank">
            <span className={cn(icon, "h-4 w-4")}></span>
          </a>
        </Button>
      ))}
    </div>
  )
}

// TYPES ***********************************************************************************************************************************
export type SocialButtonsProps = HTMLAttributes<HTMLDivElement> & {ref?: Ref<HTMLDivElement>}
