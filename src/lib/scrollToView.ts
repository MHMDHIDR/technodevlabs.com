/**
 * A function that scrolls to a view of an element and it keeps margin scroll of 100 on top of the element
 * @param scrollY the id of the element to scroll to
 * @returns void
 */
export function scrollToView(scrollY: string, marginTop: number = 200): void {
  setTimeout(
    () =>
      window.scrollTo({
        top: (document.querySelector(`#${scrollY}`) as HTMLElement)?.offsetHeight - marginTop,
        behavior: 'smooth'
      }),
    100
  )
}
