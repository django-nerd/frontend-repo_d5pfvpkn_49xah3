import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const HUNTER = '#2C5F4D'
const CHARCOAL = '#1A1A1A'
const WARM_WHITE = '#FAFAFA'

function DataTicker() {
  const items = useMemo(
    () => [
      'Currently accepting 3 clients this quarter',
      '127% average conversion lift',
      '50+ brands transformed',
    ],
    []
  )
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 2800)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <div className="mt-10 h-6 relative overflow-hidden" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="font-space text-[14px] tracking-tight"
          style={{ color: HUNTER }}
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ScrollIndicator({ hidden }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-3 select-none"
    >
      <div className="text-xs text-gray-300">Scroll to see psychology in action</div>
      <div className="relative h-[60px] w-px" style={{ backgroundColor: HUNTER }}>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full animate-pulse-slow" style={{ backgroundColor: HUNTER }} />
      </div>
    </motion.div>
  )
}

export default function App() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  // Scroll-based transforms (0 -> 1 across first viewport)
  const splineScale = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const splineY = useTransform(scrollYProgress, [0, 1], [0, -150])

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  const [hideIndicator, setHideIndicator] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHideIndicator(true), 3000)
    const onScroll = () => setHideIndicator(true)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-[200vh] relative bg-[#1A1A1A] text-white">
      {/* HERO viewport */}
      <section className="relative h-screen overflow-hidden">
        {/* Spline cover background */}
        <motion.div style={{ scale: splineScale, y: splineY }} className="absolute inset-0">
          <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </motion.div>

        {/* Fluid gradient mesh underlay (subtle) */}
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-70">
          <div className="absolute -inset-1 gradient-mesh" />
          <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
        </div>

        {/* Right emphasis mask to keep focus on right-side depth while content stays legible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#1A1A1A]/30 via-transparent to-[#1A1A1A]" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="px-8 sm:px-12 md:px-16 lg:px-24 xl:px-28 2xl:px-40 max-w-[45vw] min-w-[300px]">
            {/* Headline */}
            <motion.h1
              style={{ scale: headlineScale, opacity: headlineOpacity }}
              className="font-playfair text-[40px] sm:text-[56px] md:text-[64px] leading-[1.1] tracking-[-0.02em] text-white"
            >
              <motion.span
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8 }}
                className="block"
              >
                We Engineer
              </motion.span>
              <motion.span
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="block"
              >
                Attention,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="block"
              >
                Emotion,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="block"
              >
                Action.
              </motion.span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.6 }}
              className="mt-6 text-[18px] leading-[1.6] text-[#999999] max-w-[60ch]"
            >
              Psychology-driven design for brands that demand measurable results.
            </motion.p>

            {/* Data ticker */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.4, duration: 0.6 }}>
              <DataTicker />
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.0, duration: 0.6 }}>
              <a
                href="#framework"
                className="inline-flex items-center mt-14 bg-[#2C5F4D] text-white text-[16px] font-medium px-9 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(44,95,77,0.3)] hover:shadow-[0_12px_32px_rgba(44,95,77,0.35)] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1"
              >
                Explore The Framework →
              </a>
            </motion.div>
          </div>
        </div>

        <ScrollIndicator hidden={hideIndicator} />
      </section>

      {/* Placeholder next section to enable scroll experience */}
      <section id="framework" className="relative min-h-screen px-8 sm:px-12 md:px-16 lg:px-24 xl:px-28 2xl:px-40 py-24 flex items-center">
        <div className="max-w-3xl">
          <h2 className="font-playfair text-3xl sm:text-4xl text-white mb-6">The Psychology Framework</h2>
          <p className="text-gray-300 leading-relaxed">
            This is a preview section to demonstrate the scroll transition. We scale the environment subtly as you move,
            separating layers to create depth and intent.
          </p>
        </div>
      </section>
    </div>
  )
}
