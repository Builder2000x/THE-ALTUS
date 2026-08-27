import type { Metadata, Viewport } from 'next'
import './globals.css'
import './motion.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { ScrollProgress } from '@/components/EditorialMotion'

export const metadata: Metadata = {
  metadataBase: new URL('https://altusnews.com'),
  applicationName: 'Altus News',
  title: { default: 'Altus News — Global intelligence, every morning', template: '%s | Altus News' },
  description: 'Five minutes every morning. Intelligence at the intersection of geopolitics, AI, and global finance.',
  keywords: ['Altus News', 'global news', 'geopolitics', 'artificial intelligence', 'global finance', 'technology'],
  authors: [{ name: 'Altus News', url: 'https://altusnews.com' }],
  creator: 'Altus News',
  publisher: 'Altus News',
  category: 'news',
  icons: {
    icon: [{ url: '/brand/altus-logo.png', type: 'image/png', sizes: '1255x1255' }],
    apple: [{ url: '/brand/altus-logo.png', type: 'image/png', sizes: '1255x1255' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Altus News',
    locale: 'en_US',
    url: 'https://altusnews.com',
    title: 'Altus News — Global intelligence, every morning',
    description: 'Five minutes every morning. Intelligence at the intersection of geopolitics, AI, and global finance.',
    images: [{ url: '/brand/altus-logo.png', width: 1255, height: 1255, alt: 'Altus News logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Altus News — Global intelligence, every morning',
    description: 'Five minutes every morning. Intelligence at the intersection of geopolitics, AI, and global finance.',
    images: ['/brand/altus-logo.png'],
  },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#fcfbf8' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" style={{ '--font-serif': 'Georgia', '--font-sans': 'Arial' } as React.CSSProperties}><body><ScrollProgress /><SiteHeader />{children}<SiteFooter /></body></html>
}
