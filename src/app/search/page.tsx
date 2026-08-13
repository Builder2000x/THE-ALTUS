import type { Metadata } from 'next'
import Link from 'next/link'
import { videos } from '@/lib/content'
import { getPublishedBeehiivPosts } from '@/lib/beehiiv'
import { getPublishedSitePosts } from '@/lib/site-posts'
export const metadata:Metadata={title:'Search'}
export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){const q=(await searchParams).q?.toLowerCase()??'';const [sitePosts,beehiivPosts]=await Promise.all([getPublishedSitePosts(),getPublishedBeehiivPosts()]);const articles=[...sitePosts,...beehiivPosts];const matches=<T extends {title:string}>(xs:T[])=>xs.filter(x=>!q||x.title.toLowerCase().includes(q));return <main className="page shell search-page"><p className="eyebrow">Search Altus</p><form><input name="q" defaultValue={q} placeholder="Search articles and videos"/><button>Search</button></form><div className="results"><section><h2>Articles</h2>{matches(articles).map(x=>x.href?<a href={x.href} key={x.id}>{x.title}</a>:<Link href={'/news/'+x.slug} key={x.id}>{x.title}</Link>)}</section><section><h2>Videos</h2>{matches(videos).map(x=><a href={x.youtubeUrl} key={x.id}>{x.title}</a>)}</section></div></main>}
