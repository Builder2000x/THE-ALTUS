import type { Metadata } from 'next'
export const metadata:Metadata={title:'Contact',description:'Contact Altus News for editorial, partnerships, product and general enquiries.',alternates:{canonical:'/contact'}}
export default function ContactPage(){return <main className="page shell contact-page"><header className="page-head"><p className="eyebrow">Contact</p><h1>Start a<br/><em>conversation.</em></h1><p>For editorial, partnerships, product and general enquiries.</p></header><a className="contact-email" href="mailto:hello@altusnews.com">hello@altusnews.com</a></main>}
