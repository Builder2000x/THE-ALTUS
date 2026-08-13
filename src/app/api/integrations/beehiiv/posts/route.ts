import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim()
  const publicationId = (process.env.BEEHIIV_PUBLICATION_ID ?? 'pub_0081bc14-f163-453a-9a1c-4685ece44494').trim()
  if (!apiKey) return NextResponse.json({ status: 'configuration-pending', message: 'Add BEEHIIV_API_KEY server-side to enable published post sync.' })

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    })
    if (!response.ok) return NextResponse.json({ error: 'Beehiiv post sync failed.' }, { status: 502 })
    return NextResponse.json(await response.json())
  } catch {
    return NextResponse.json({ error: 'Beehiiv post sync is temporarily unavailable.' }, { status: 502 })
  }
}
