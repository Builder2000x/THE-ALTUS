import { Radio } from 'lucide-react'

export default function SignalTicker({ items }: { items: string[] }) {
  const signals = [...items, 'Intelligence at the intersection of geopolitics, AI, and global finance.', 'Five minutes every morning. Everything you need to know. Nothing you don’t.'].slice(0, 6)

  return <section className="signal-ticker" aria-label="Altus Signal Wire"><div className="signal-ticker-label"><Radio size={14} /><span>Signal Wire</span></div><div className="signal-ticker-viewport"><div className="signal-ticker-track">{[...signals, ...signals].map((signal, index) => <span className="signal-ticker-item" key={`${signal}-${index}`} aria-hidden={index >= signals.length}><i aria-hidden="true" />{signal}</span>)}</div></div></section>
}
