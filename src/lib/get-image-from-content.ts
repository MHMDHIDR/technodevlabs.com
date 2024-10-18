import { APP_LOGO_opengraph } from '@/data/constants'
import type { PostWithAuthor } from '@/types'

/**
 * A function to get the image from the content of a post
 * @param content
 * @returns Promise<string>
 */
export async function getImageFromContent({
  content
}: {
  content: PostWithAuthor['content']
}): Promise<string> {
  const imgSrcMatch = content.match(/<img.*?src="(.*?)"/)
  const image = imgSrcMatch ? imgSrcMatch[1] : APP_LOGO_opengraph

  return image
}
