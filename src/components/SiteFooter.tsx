import Link from 'next/link'
import Image from 'next/image'
import logo from '../../transparent logo.png'
import NewsletterForm from './NewsletterForm'

type SocialName = 'Facebook' | 'Instagram' | 'X' | 'Bluesky' | 'TikTok' | 'YouTube'

const socialLinks: { label: SocialName; href: string }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/altusnewss' },
  { label: 'Instagram', href: 'https://www.instagram.com/altusnewss/' },
  { label: 'X', href: 'https://x.com/AltusNewss' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/altusnews.bsky.social' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@altusnews' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCsr7W63vA711gx8cQnJ05ig' },
]

function SocialIcon({ name }: { name: SocialName }) {
  if (name === 'Facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.7-1.6h1.8V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.9H7.3V13h2.9v8h3.5Z" fill="currentColor" /></svg>
  if (name === 'Instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.8" r="1.15" fill="currentColor" /></svg>
  if (name === 'X') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2h3.7l-8 9.2L24 23h-7.4l-5.8-7.6L4.2 23H.5l8.6-9.8L0 2h7.6l5.2 6.9L18.9 2Zm-1.3 19.5h2L6.5 4.1H4.3l13.3 17.4Z" fill="currentColor" /></svg>
  if (name === 'Bluesky') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 10.9C10.7 8.5 7.2 4.5 3.9 2.2 1.6.6.8.9.2 1.2-.5 1.5-.5 2.7-.5 3.3c0 .6.3 5.1.5 5.8.8 2.5 3.6 3.4 6.2 3.1-4.1.6-7.7 2.2-3 7.5 5.2 5.2 7.1-1.2 8.1-4.4.1-.2.3-.2.4 0 1 3.2 2.9 9.6 8.1 4.4 4.7-5.3 1.1-6.9-3-7.5 2.6.3 5.4-.6 6.2-3.1.2-.7.5-5.2.5-5.8 0-.6 0-1.8-.7-2.1-.6-.3-1.4-.6-3.7 1C16.8 4.5 13.3 8.5 12 10.9Z" fill="currentColor" /></svg>
  if (name === 'TikTok') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 2.4c.5 2.8 2.1 4.5 4.8 4.7v3.2c-1.7.1-3.2-.4-4.7-1.3v6.5c0 4.8-5.3 6.3-8.8 3.7-2.2-1.7-2.7-5.6-.9-7.8 1.2-1.5 3.3-2.2 5.4-1.8v3.3c-.8-.3-1.5-.2-2 .2-1.5 1.1-1 3.7.8 3.9 1.2.2 2.2-.6 2.2-1.9V2.4h3.2Z" fill="currentColor" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" fill="currentColor" /></svg>
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Image className="footer-logo" src={logo} alt="Altus News" />
          <p className="footer-copy">Independent ideas, considered reporting, and useful tools for people making sense of a changing world.</p>
        </div>
        <div>
          <p className="eyebrow">The weekly brief</p>
          <NewsletterForm compact />
        </div>
        <div className="footer-socials">
          <p className="eyebrow">Follow Altus</p>
          <div className="social-link-list">
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Follow Altus on ${label}`} title={label}>
                <SocialIcon name={label} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>&copy; {new Date().getFullYear()} Altus News</span>
        <div><Link href="/contact">Contact</Link><Link href="/about">About</Link></div>
      </div>
    </footer>
  )
}
