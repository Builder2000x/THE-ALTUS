import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRIMARY_DOMAIN = 'altusnews.com'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase().split(':')[0]

  if (host === `www.${PRIMARY_DOMAIN}`) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = PRIMARY_DOMAIN
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
