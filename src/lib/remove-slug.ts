/**
 * A function to remove the slug
 * @param txt the slug to be converted to text
 * @returns the normal text example (this-is-text) => (this is text)
 */
export const removeSlug = (txt: string) => txt?.replace(/-/g, ' ')
