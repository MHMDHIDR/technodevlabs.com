/** A function to create a slug
 * making the text from (this is text) => (this-is-text)
 * @param txt the text to be converted to slug
 * @returns the slug
 */
export function createSlug(txt: string) {
  return txt
    ?.replace(/[^A-Za-z0-9أ-ي -]/g, '') // remove invalid chars
    ?.replace(/\s+/g, '-') // collapse whitespace and replace by -
    ?.replace(/-+/g, '-') // collapse dashes replace with one dash
    ?.toLowerCase() //
}
