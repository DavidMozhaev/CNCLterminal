import { useEffect, useMemo, useRef } from 'react'

const CROSSFADE = 0.3 // fixed crossfade window, in screen-heights, regardless of scene length

// Cumulative layout in "screen-height" units (1.0 = one viewport height),
// so scenes taller than 100vh (stretched Lore stages) fit the same model.
function buildLayout(scenes) {
  let acc = 0
  return scenes.map((s) => {
    const length = (s.heightVh ?? 100) / 100
    const start = acc
    acc += length
    return { start, length, end: start + length }
  })
}

function computeLayerStyle(globalPos, layout, i) {
  const { start, length, end } = layout[i]
  const lifeProgress = Math.max(0, Math.min((globalPos - start) / length, 1))
  const scale = 1.02 + 0.06 * lifeProgress

  let opacity = 0
  let maskStop = 100
  let blur = 0

  if (globalPos >= start && globalPos < end) {
    if (globalPos < end - CROSSFADE) {
      opacity = 1
    } else {
      const t = (globalPos - (end - CROSSFADE)) / CROSSFADE
      opacity = 1 - t
      blur = 3 * (1 - Math.abs(2 * t - 1))
    }
  } else if (i > 0) {
    const prev = layout[i - 1]
    if (globalPos >= prev.end - CROSSFADE && globalPos < prev.end) {
      const t = (globalPos - (prev.end - CROSSFADE)) / CROSSFADE
      opacity = t
      maskStop = t * 100
      blur = 3 * (1 - Math.abs(2 * t - 1))
    }
  }

  return { opacity, scale, blur, maskStop }
}

function Embers({ left = 34 }) {
  const embers = useMemo(
    () =>
      Array.from({ length: 14 }, (_, idx) => ({
        id: idx,
        left: left + Math.random() * 14,
        size: 2 + Math.random() * 3,
        duration: 3.2 + Math.random() * 2.4,
        delay: Math.random() * 4,
        drift: (Math.random() - 0.5) * 60,
      })),
    [left],
  )
  return (
    <div className="absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            '--drift': `${e.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export default function BackgroundStack({ scenes }) {
  const layerRefs = useRef([])
  const layout = useMemo(() => buildLayout(scenes), [scenes])
  const total = layout.length ? layout[layout.length - 1].end : 0

  useEffect(() => {
    let ticking = false

    const update = () => {
      const vh = window.innerHeight
      const globalPos = Math.max(0, Math.min(window.scrollY / vh, total))
      layerRefs.current.forEach((el, i) => {
        if (!el) return
        const { opacity, scale, blur, maskStop } = computeLayerStyle(globalPos, layout, i)
        el.style.opacity = opacity
        el.style.transform = `scale(${scale})`
        el.style.filter = blur > 0.02 ? `blur(${blur.toFixed(2)}px)` : 'none'
        const mask = `linear-gradient(to bottom, black 0%, black ${maskStop}%, transparent ${Math.min(maskStop + 14, 100)}%)`
        el.style.maskImage = mask
        el.style.webkitMaskImage = mask
      })
      ticking = false
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
  }, [layout, total])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {scenes.map((scene, i) => (
        <div
          key={scene.img}
          ref={(el) => (layerRefs.current[i] = el)}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${scene.img})` }}
        >
          {scene.water && <div className="river-shimmer" />}
          {scene.fire && (
            <>
              <div
                className="fire-glow absolute rounded-full"
                style={{
                  left: `${scene.fire.left}%`,
                  bottom: `${scene.fire.bottom}%`,
                  width: '22vw',
                  height: '22vw',
                  transform: 'translate(-50%, 50%)',
                  background:
                    'radial-gradient(circle, rgba(255,150,60,0.55) 0%, rgba(255,110,30,0.25) 35%, transparent 70%)',
                  filter: 'blur(6px)',
                }}
              />
              <Embers left={scene.fire.left - 6} />
            </>
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}
    </div>
  )
}
