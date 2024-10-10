declare module 'tailwindcss/lib/util/flattenColorPalette' {
  function flattenColorPalette(_colors: object): { [key: string]: string }
  export = flattenColorPalette
}

declare module 'mini-svg-data-uri' {
  function svgToDataUri(_svg: string): string
  export = svgToDataUri
}
