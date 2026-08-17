import { useEffect, useRef, useState } from 'react'
import { scenes, navGroups } from './scenes'
import BackgroundStack from './components/BackgroundStack'
import Particles from './components/Particles'
import SunGlare from './components/SunGlare'
import Nav from './components/Nav'
import TokenExtras from './components/TokenExtras'
import Footer from './components/Footer'
import ScrollBlocks from './components/ScrollBlocks'
import TimedBlocks from './components/TimedBlocks'

function CopyBlock({ kicker, title, body, tokenCA, dexscreenerUrl, className }) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : []
  return (
    <div className={className}>
      {kicker && (
        <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-white/70 uppercase">{kicker}</p>
      )}
      {title && <h2 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h2>}
      {paragraphs.map((p, i) => (
        <p key={i} className={`mx-auto text-balance text-white/85 ${i > 0 ? 'mt-3' : ''}`}>
          {p}
        </p>
      ))}
      {tokenCA && <TokenExtras ca={tokenCA} dexscreenerUrl={dexscreenerUrl} />}
    </div>
  )
}

const renderBlock = (block) => (
  <CopyBlock {...block} className="copy-panel text-block text-center text-white" />
)

// Stretched (`scene.stretch`) scenes get real extra scroll height so their
// blocks can cycle one-at-a-time tied to scroll position while the
// background stays pinned (BackgroundStack). Plain 100vh scenes have no
// scroll room to spare, so their blocks auto-cycle on a timer once visible.
// Token keeps its original single always-visible panel untouched.
function Scene({ scene, index }) {
  const trackRef = useRef(null)
  const hasLegacyCopy = Boolean(scene.title || scene.body)

  if (scene.blocks && scene.stretch) {
    return (
      <>
        <section
          ref={trackRef}
          id={scene.open ? scene.group : undefined}
          data-group={scene.group}
          className="relative w-full scroll-mt-16"
          style={{ height: `${scene.heightVh}vh` }}
        />
        <ScrollBlocks trackRef={trackRef} blocks={scene.blocks} renderBlock={renderBlock} />
      </>
    )
  }

  return (
    <section
      id={scene.open ? scene.group : undefined}
      data-group={scene.group}
      className="relative h-screen w-full scroll-mt-16"
    >
      {scene.blocks ? (
        <TimedBlocks blocks={scene.blocks} renderBlock={renderBlock} />
      ) : (
        hasLegacyCopy && (
          <div className="flex h-full w-full items-center justify-center px-6">
            <CopyBlock
              kicker={scene.kicker}
              title={scene.title}
              body={scene.body}
              tokenCA={scene.tokenCA}
              dexscreenerUrl={scene.dexscreenerUrl}
              className="fade-up copy-panel w-full max-w-2xl px-6 py-7 text-center text-white sm:px-9 sm:py-9"
            />
          </div>
        )
      )}

      {index === 0 && (
        <div className="scroll-hint absolute bottom-9 left-1/2 -translate-x-1/2 text-white/70">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </section>
  )
}

function App() {
  const [activeGroup, setActiveGroup] = useState(navGroups[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-group]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveGroup(visible.target.dataset.group)
      },
      { threshold: [0.5], rootMargin: '-64px 0px 0px 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying((v) => !v)
  }

  return (
    <>
      <BackgroundStack scenes={scenes} />
      <SunGlare />
      <Particles />

      <Nav activeGroup={activeGroup} isPlaying={isPlaying} onToggleMusic={toggleMusic} />

      <audio ref={audioRef} src="/audio/theme.mp3" loop preload="none" />

      <main className="relative z-30">
        {scenes.map((scene, i) => (
          <Scene key={scene.img} scene={scene} index={i} />
        ))}
        <Footer />
      </main>
    </>
  )
}

export default App
