'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function subscribe(event: React.FormEvent) {
    event.preventDefault()
    setState('loading')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error('Subscription failed')
      setState('success')
    } catch {
      setState('error')
    }
  }

  return <form className={`newsletter-form ${compact ? 'compact' : ''}`} onSubmit={subscribe}>
    {state === 'success' ? <p className="form-success" aria-live="polite">You’re on the list. Welcome to Altus.</p> : <>
      <input required type="email" name="email" autoComplete="email" spellCheck={false} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Email address" />
      <button aria-label="Subscribe" disabled={state === 'loading'}>{state === 'loading' ? '…' : <ArrowRight size={19} />}</button>
      {state === 'error' && <p className="form-error" aria-live="polite">Try again in a moment.</p>}
    </>}
  </form>
}
