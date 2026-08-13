export function AdBanner({label='Advertisement'}:{label?:string}){return <aside className="ad-slot ad-banner" aria-label={label}><span>{label}</span><strong>Partner with Altus</strong><small>Reserved sponsor placement</small></aside>}
export function InArticleAd(){return <AdBanner label="Sponsored space"/>}
export function SidebarAd(){return <aside className="ad-slot sidebar-ad"><span>Advertisement</span><strong>Make your next idea matter.</strong><small>Advertise with Altus</small></aside>}
export function SponsoredContent(){return <div className="sponsored"><span>Partner story</span><p>Thoughtful partnerships for a thoughtful audience.</p></div>}
export function NewsletterSponsor(){return <div className="newsletter-sponsor"><span>This edition is presented by</span><strong>Your brand</strong></div>}
