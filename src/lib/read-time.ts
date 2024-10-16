import { getLocale } from 'next-intl/server'

/**
 * A Function to Calculate the read time of an article
 * @param article The article content to calculate the read time for
 * @returns Number of minutes to read the article
 */
export async function calculateReadTime(article: string): Promise<string> {
  const currentLocale = await getLocale()

  const wordsPerMinute = 150

  // Remove any leading or trailing whitespace from the article
  const trimmedArticle = article.trim()

  // Split the article into an array of words
  const words = trimmedArticle.split(/\s+/)

  // Calculate the read time by dividing the total number of words by words per minute
  const readTime = Math.ceil(words.length / wordsPerMinute)

  return readTime > 1
    ? `${readTime} ${currentLocale === 'en' ? 'mins read' : 'دقائق للقراءة'}`
    : currentLocale === 'en'
      ? '1 min read'
      : '1 دقيقة للقراءة'
}
