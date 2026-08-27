import type { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import MascotMoment from '@/components/MascotMoment'
export const metadata:Metadata={title:'Subscribe',description:'Subscribe to the Altus News brief.',alternates:{canonical:'/subscribe'}}
export default function SubscribePage(){return <main className="subscribe-page"><div className="subscribe-orbit"><span>Altus</span></div><MascotMoment pose="guide" className="subscribe-mascot"/><div><p className="eyebrow">The weekly brief</p><h1>One thoughtful email.<br/><em>Every week.</em></h1><p>Ideas, reporting and practical resources for the people making a difference.</p><NewsletterForm/></div></main>}
