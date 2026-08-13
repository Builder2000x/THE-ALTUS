import { NextResponse } from 'next/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}))
  if (typeof email !== 'string' || !emailPattern.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY?.trim()
  const publicationId = (process.env.BEEHIIV_PUBLICATION_ID ?? 'pub_0081bc14-f163-453a-9a1c-4685ece44494').trim()
  if (!apiKey) {
    return NextResponse.json({ error: 'Newsletter signup is being configured. Please try again shortly.' }, { status: 503 })
  }

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, send_welcome_email: true, utm_source: 'altusnews.com', utm_medium: 'website' }),
    })
    if (!response.ok) {
      return NextResponse.json({ error: 'We could not add that email to the brief. Please check it and try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'The newsletter service is temporarily unavailable. Please try again shortly.' }, { status: 503 })
  }
}
