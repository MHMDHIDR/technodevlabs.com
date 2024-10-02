/**
 * A function to format the date and time with appropriate granularity.
 * This function takes a date string and returns a more intuitive, human-readable format.
 * Example: 2022-03-28T00:00:00.000Z => '2 weeks ago'
 * @param date the date string to be formatted
 * @returns the formatted date
 */
export const formatDate = (date: string): string => {
  const now = new Date().getTime()
  const givenDate = new Date(date).getTime()
  const diff = now - givenDate
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  switch (true) {
    case days === 0:
      return 'Today'

    case days === 1:
      return 'Yesterday'

    case days >= 2 && days <= 5:
      return `${days} days ago`

    case days >= 6 && days <= 8:
      return '1 week ago'

    case days >= 9 && days <= 12:
      return '1 week ago'

    case days >= 13 && days <= 17:
      return '2 weeks ago'

    case weeks > 2 && weeks < 4:
      return `${weeks} weeks ago`

    case days >= 25 && days <= 35:
      return '1 month ago'

    case months >= 2 && months <= 11:
      return `${months} months ago`

    case years === 1:
      return '1 year ago'

    case years > 1:
      return `${years} years ago`

    default:
      return `${days} days ago`
  }
}
