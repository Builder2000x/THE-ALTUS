import type { Metadata, Viewport } from 'next'
import './globals.css'
import './motion.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { ScrollProgress } from '@/components/EditorialMotion'
export const metadata:Metadata={metadataBase:new URL('https://altusnews.com'),title:{default:'Altus — Ideas in motion',template:'%s | Altus'},description:'Independent ideas, considered reporting, and useful tools for the people moving Africa forward.',openGraph:{type:'website',siteName:'Altus',locale:'en_US'},twitter:{card:'summary_large_image'}}
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#fcfbf8'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" style={{'--font-serif':'Georgia','--font-sans':'Arial'} as React.CSSProperties}><body><ScrollProgress/><SiteHeader/>{children}<SiteFooter/></body></html>}
