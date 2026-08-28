import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Article, Product, Video } from '@/lib/content'

function ArticleDestination({article,children,className}:{article:Article;children:ReactNode;className?:string}){return article.href?<a href={article.href} className={className} target="_blank" rel="noreferrer">{children}</a>:<Link href={`/news/${article.slug}`} className={className}>{children}</Link>}
function ArticleImage({article}:{article:Article}) {
  if (typeof article.image === 'string') {
    return <>
      {article.href && <img className="newsletter-artwork-backdrop" src={article.image} alt="" aria-hidden="true" loading="lazy" />}
      <img className={article.href ? 'newsletter-artwork-image' : undefined} src={article.image} alt={article.title} loading="lazy" />
    </>
  }
  return <Image src={article.image} alt={article.title} fill sizes="(max-width: 700px) 100vw, 50vw"/>
}

export function ArticleCard({article,featured=false}:{article:Article;featured?:boolean}){
  const storyDetails = <><div className="card-meta"><span>{article.category}</span><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric'}).format(new Date(article.publishedAt))}</time></div><h3><ArticleDestination article={article}>{article.title}</ArticleDestination></h3><p>{article.excerpt}</p></>
  return <article className={'article-card '+(featured?'featured ':'')+(article.href?'newsletter-card':'')}><ArticleDestination article={article} className={'card-image'+(article.href?' newsletter-artwork':'')}><ArticleImage article={article}/></ArticleDestination>{featured?<div className="article-card-copy">{storyDetails}</div>:storyDetails}</article>
}
export function ProductCard({product}:{product:Product}){return <article className="product-card"><Link href={'/products/'+product.slug} className="product-image"><Image src={product.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw"/></Link><div><span className="card-kicker">{product.type}</span><h3><Link href={'/products/'+product.slug}>{product.title}</Link></h3><p>{product.shortDescription}</p><strong>${product.price.toFixed(2)}</strong></div></article>}
export function VideoCard({video}:{video:Video}){return <article className="video-card"><a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="card-image">{typeof video.thumbnail==='string'?<img src={video.thumbnail} alt="" loading="lazy"/>:<Image src={video.thumbnail} alt="" fill sizes="(max-width: 700px) 100vw, 50vw"/>}<span className="play-mark">Play on YouTube</span></a><span className="card-kicker">{video.category}</span><h3>{video.title}</h3><p>{video.description}</p></article>}
