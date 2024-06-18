import {PostsSection} from "@/components/posts-section"
import {fetchHome} from "@/lib/pocketbase"

// ROOT ************************************************************************************************************************************
export async function HomeLastPosts() {
  const {lastPosts} = await fetchHome()
  const {tagline, title} = lastPosts

  return (
    <PostsSection first={3} title={title} tagline={tagline} className="bg-white" />
  )
}
