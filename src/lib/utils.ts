import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** A function to create a slug
 * making the text from (this is text) => (this-is-text)
 * @param txt the text to be converted to slug
 * @returns the slug
 */
export const createSlug = (txt: string) =>
  txt
    ?.replace(/[^A-Za-z0-9أ-ي -]/g, '') // remove invalid chars
    ?.replace(/\s+/g, '-') // collapse whitespace and replace by -
    ?.replace(/-+/g, '-') // collapse dashes replace with one dash
    ?.toLowerCase() //

/**
 * A function to remove the slug
 * @param txt the slug to be converted to text
 * @returns the normal text example (this-is-text) => (this is text)
 */
export const removeSlug = (txt: string) => txt?.replace(/-/g, ' ')
