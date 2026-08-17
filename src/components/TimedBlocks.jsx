import { useEffect, useRef, useState } from 'react'
import { ZONES } from './ScrollBlocks'

// For sections that keep their natural 100vh height (no extra scroll room):
// once scrolled into view, blocks auto-advance one at a time on a timer
// instead of being tied to scroll position.
export default function TimedBlocks({ blocks, renderBlock, intervalMs = 2800 }) {
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setStarted(true), {
      threshold: 0.5,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || blocks.length < 2) return
    const id = setInterval(() => setActive((a) => (a + 1) % blocks.length), intervalMs)
    return () => clearInterval(id)
  }, [started, blocks.length, intervalMs])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {blocks.map((block, i) => (
        <div
          key={i}
          className={`absolute px-4 transition-opacity duration-700 ease-out ${ZONES[i % ZONES.length]}`}
          style={{ opacity: started && i === active ? 1 : 0 }}
        >
          {renderBlock(block)}
        </div>
      ))}
    </div>
  )
}
