import type { StaticImageData } from 'next/image'
import banner from '../../GOAT BANNER.png'
import characterSheet from '../../many goat characters.png'
import mascot from '../../mascot character.png'

type Media = string | StaticImageData
export type Article = { id:string; slug:string; title:string; subtitle:string; excerpt:string; author:string; publishedAt:string; category:string; tags:string[]; image:Media; body:string[]; featured?:boolean; href?:string }
export type Product = { id:string; slug:string; title:string; shortDescription:string; description:string; price:number; currency:string; type:string; image:Media; featured?:boolean; includes:string[] }
export type Video = { id:string; title:string; description:string; publishedAt:string; youtubeUrl:string; thumbnail:Media; category:string }

// These are visual fallbacks only. Editorial cards are always populated from
// Altus's own Publishing Desk or confirmed Beehiiv posts — never mock stories.
export const articleFallbackImages: Media[] = [banner, characterSheet, mascot]
export const products: Product[] = [
 {id:'prd_01',slug:'altus-business-planning-guide',title:'The Altus Business Planning Guide',shortDescription:'A practical framework for turning an idea into a durable plan.',description:'A considered digital guide for operators who need a clear starting point and a serious system for their next venture.',price:19,currency:'USD',type:'Guide',image:mascot,featured:true,includes:['80-page digital guide','Planning framework','Financial model templates','Decision checklists']},
 {id:'prd_02',slug:'weekly-decision-template',title:'Weekly Decision Template',shortDescription:'A focused operating system for clearer weeks.',description:'A minimalist planning template built around the decisions that move work forward.',price:9,currency:'USD',type:'Template',image:characterSheet,includes:['Notion template','Weekly review ritual','Priority matrix']}
]
export const videos: Video[] = [{id:'vid_01',title:'Altus: conversations that move ideas forward',description:'A new visual series on the people and ideas changing the continent.',publishedAt:'2026-08-10',youtubeUrl:'https://www.youtube.com/channel/UCsr7W63vA711gx8cQnJ05ig',thumbnail:banner,category:'Conversations'}]
export function mediaUrl(media:Media){return typeof media === 'string' ? media : media.src}
export function getProduct(slug:string){return products.find(p=>p.slug===slug)}
