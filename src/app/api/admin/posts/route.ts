import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const required = ['title', 'slug', 'excerpt', 'body', 'category', 'author'] as const
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const token = request.headers.get('authorization')
  if (!url || !key || !token) return NextResponse.json({ error: 'Publishing is not configured.' }, { status: 503 })
  const values = await request.json() as Record<string, string>
  if (required.some((field) => !values[field]?.trim())) return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) return NextResponse.json({ error: 'Use lowercase letters, numbers, and hyphens for the URL slug.' }, { status: 400 })
  const supabase = createClient(url, key, { global: { headers: { Authorization: token } }, auth: { persistSession: false } })
  const { data: { user } } = await supabase.auth.getUser(token.replace(/^Bearer\s+/i, ''))
  if (!user) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  const status = values.status === 'published' ? 'published' : 'draft'
  const { error } = await supabase.from('posts').insert({ title: values.title.trim(), slug: values.slug.trim(), subtitle: values.subtitle?.trim() || null, excerpt: values.excerpt.trim(), body: values.body.trim(), category: values.category.trim(), author: values.author.trim(), cover_image_url: values.cover_image_url?.trim() || null, status, published_at: status === 'published' ? new Date().toISOString() : null, author_id: user.id })
  if (error) return NextResponse.json({ error: error.message.includes('row-level security') ? 'This signed-in account is not yet approved as an Altus editor.' : error.message }, { status: 403 })
  if (status === 'published') { revalidatePath('/news'); revalidatePath(`/news/${values.slug}`); revalidatePath('/') }
  return NextResponse.json({ message: status === 'published' ? 'Published to Altus News.' : 'Draft saved.' })
}
