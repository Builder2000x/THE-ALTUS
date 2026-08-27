import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Altus News',
    short_name: 'Altus',
    description: 'Global intelligence at the intersection of geopolitics, AI, technology, and finance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/brand/altus-logo.png',
        sizes: '1255x1255',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
