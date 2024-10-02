/**
 * A Function to Calculate the read time of an article
 * @param article The article content to calculate the read time for
 * @returns Number of minutes to read the article
 */
export const calculateReadTime = (article: string): string => {
  const wordsPerMinute = 200 // Adjust this value based on the average reading speed

  // Remove any leading or trailing whitespace from the article
  const trimmedArticle = article.trim()

  // Split the article into an array of words
  const words = trimmedArticle.split(/\s+/)

  // Calculate the read time by dividing the total number of words by words per minute
  const readTime = Math.ceil(words.length / wordsPerMinute)

  return readTime > 1 ? `${readTime} minutes in read` : '1 minute in read'
}
