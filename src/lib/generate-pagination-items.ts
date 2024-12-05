import { ITEMS_COUNT } from '@/data/constants'

/**
 *  Generate page numbers for pagination
 * @param currentPage  - Current page number
 * @param totalPages - Total number of pages
 * @returns       - Array of page numbers
 */
export const generatePaginationItems = (currentPage: number, totalPages: number) => {
  const items = []

  if (totalPages <= ITEMS_COUNT) {
    // Show all pages if total pages is less than or equal to ITEMS_COUNT
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
  } else {
    // Always show first page
    items.push(1)

    if (currentPage > 3) {
      items.push('ellipsis-start')
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      items.push(i)
    }

    if (currentPage < totalPages - 2) {
      items.push('ellipsis-end')
    }

    // Always show last page
    items.push(totalPages)
  }

  return items
}
