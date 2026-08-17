import { useEffect, useRef } from 'react'

// Screen zones text blocks cycle through — kept few and spread out so a
// mid-crossfade pair (outgoing + incoming) never visually collide.
export const ZONES = [
  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-[18%] left-[6%] sm:left-[10%]',
  'top-[18%] right-[6%] sm:right-[10%]',
  'bottom-[18%] left-[6%] sm:left-[10%]',
  'bottom-[18%] right-[6%] sm:right-[10%]',
]

const CROSSFADE = 0.3 // fraction of one block's on-screen "slot" spent fading to the next

function blockOpacity(exact, i, n) {
  const baseIdx = Math.min(Math.floor(exact), n - 1)
  const localT = exact - baseIdx
  if (i === baseIdx) {
    return localT < 1 - CROSSFADE ? 1 : 1 - (localT - (1 - CROSSFADE)) / CROSSFADE
  }
  if (i === baseIdx + 1 && localT >= 1 - CROSSFADE) {
    return (localT - (1 - CROSSFADE)) / CROSSFADE
  }
  return 0
}

// Renders exactly one (occasionally two, mid-crossfade) of `blocks` at a
// time, pinned to the viewport while `trackRef`'s tall scroll-track element
// is being scrolled through — the block shown is driven purely by how far
// through that track the user has scrolled.
export default function ScrollBlocks({ trackRef, blocks, renderBlock }) {
  const blockRefs = useRef([])
  const layerRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const track = trackRef.current
      const layer = layerRef.current
      ticking = false
      if (!track || !layer) return

      const rect = track.getBoundingClientRect()
      const active = rect.top <= 0 && rect.bottom > 0
      if (!active) {
        layer.style.visibility = 'hidden'
        return
      }
      layer.style.visibility = 'visible'

      // Progress over the track's FULL height (not height-minus-viewport) so
      // each block gets its intended share of scroll — this must match how
      // BackgroundStack sizes/times the same stretched scene.
      const progress = Math.max(0, Math.min(-rect.top / rect.height, 1))
      const exact = progress * blocks.length
      blockRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = blockOpacity(exact, i, blocks.length)
      })
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [trackRef, blocks.length])

  return (
    <div ref={layerRef} className="pointer-events-none fixed inset-0 z-30" style={{ visibility: 'hidden' }}>
      {blocks.map((block, i) => (
        <div
          key={i}
          ref={(el) => (blockRefs.current[i] = el)}
          className={`absolute px-4 ${ZONES[i % ZONES.length]}`}
          style={{ opacity: 0 }}
        >
          {renderBlock(block)}
        </div>
      ))}
    </div>
  )
}
