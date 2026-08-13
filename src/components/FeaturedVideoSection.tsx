import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
const video = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'
export default function FeaturedVideoSection(){
 const ref=useRef<HTMLElement>(null); const inView=useInView(ref,{once:true,margin:'-100px'})
 return <section ref={ref} id="features" className="featured"><motion.div className="feature-frame" initial={{opacity:0,y:60}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.9}}>
  <video src={video} muted autoPlay loop playsInline preload="auto"/><div className="video-gradient"/><div className="feature-overlay"><div className="liquid-glass approach"><span className="eyebrow">Our approach</span><p>We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.</p></div><motion.a href="#services" className="liquid-glass explore" whileHover={{scale:1.05}} whileTap={{scale:.95}}>Explore more</motion.a></div>
 </motion.div></section>
}
