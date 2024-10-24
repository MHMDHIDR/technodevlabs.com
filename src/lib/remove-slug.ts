/**
 * A function to remove the slug
 * @param txt the slug to be converted to text
 * @returns the normal text example (this-is-text) => (this is text)
 */
export function removeSlug(txt: string) {
  return txt?.replace(/-/g, ' ')
}
