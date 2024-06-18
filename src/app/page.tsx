import { HomeAbout } from "./_/about"
import { HomeHero } from "./_/hero"
import { HomeLastPosts } from "./_/last-posts"
import { HomeNewsletter } from "./_/newsletter"
import HomeServices from "./_/services"

// ROOT ************************************************************************************************************************************
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between">
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <HomeLastPosts />
      <HomeNewsletter />
    </main>
  )
}
