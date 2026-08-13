'use client'

import Link from 'next/link'
import { Menu, Search } from 'lucide-react'
import Image from 'next/image'
import logo from '../../transparent logo.png'
import { useState } from 'react'

export default function SiteHeader(){
  const [open,setOpen]=useState(false)
  return <header className="site-header"><div className="shell header-glass">
    <Link href="/" className="wordmark" aria-label="Altus home"><Image src={logo} alt="Altus News" priority /></Link>
    <nav className={open?'open':''}><Link href="/news">News</Link><Link href="/videos">Videos</Link><Link href="/about">About</Link></nav>
    <div className="header-actions"><Link className="plain-icon" href="/search" aria-label="Search"><Search size={18}/></Link><Link className="header-cta" href="/subscribe">Get the brief</Link><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Menu"><Menu size={20}/></button></div>
  </div></header>
}
