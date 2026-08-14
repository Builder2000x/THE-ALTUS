import type { Metadata, Viewport } from 'next'
import './globals.css'
import './motion.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { ScrollProgress } from '@/components/EditorialMotion'

export const metadata: Metadata = {
  metadataBase: new URL('https://altusnews.com'),
  title: { default: 'Altus News — Global intelligence, every morning', template: '%s | Altus News' },
  description: 'Five minutes every morning. Intelligence at the intersection of geopolitics, AI, and global finance.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Altus News', locale: 'en_US', url: 'https://altusnews.com', title: 'Altus News — Global intelligence, every morning', description: 'Five minutes every morning. Intelligence at the intersection of geopolitics, AI, and global finance.' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#fcfbf8' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" style={{ '--font-serif': 'Georgia', '--font-sans': 'Arial' } as React.CSSProperties}><body><ScrollProgress /><SiteHeader />{children}<SiteFooter /></body></html>
}
