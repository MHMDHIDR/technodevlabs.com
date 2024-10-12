import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TechnoDevLabs',
    short_name: 'TechnoDevLabs',
    description:
      'TechnoDevLabs.com is a software development agency that provides software development services to clients mainly towards the middle-eastern.',
    start_url: '/',
    dir: 'auto',
    display: 'standalone',
    theme_color: '#69239E',
    background_color: '#69239E',
    icons: [
      {
        src: '/images/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  }
}
