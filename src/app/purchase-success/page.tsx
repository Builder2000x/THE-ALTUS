import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata:Metadata={title:'Purchase confirmed'}
export default function PurchaseSuccess(){return <main className="checkout-page shell"><p className="eyebrow">Purchase confirmed</p><h1>Your resource is<br/><em>on its way.</em></h1><p>Once commerce is connected, this page will be reached only after a verified payment webhook creates an entitlement.</p><Link className="buy-button" href="/account">View your library</Link></main>}
