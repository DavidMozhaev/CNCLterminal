import { Music } from 'lucide-react'
import { navGroups } from '../scenes'

export default function Nav({ activeGroup, isPlaying, onToggleMusic }) {
  const scrollToGroup = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5">
        <a
          href="#hero"
          onClick={scrollToGroup('hero')}
          className="text-sm font-semibold tracking-[0.2em] text-white/90"
        >
          SNCL
        </a>

        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navGroups.map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                onClick={scrollToGroup(g.id)}
                className={`rounded-full px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                  activeGroup === g.id
                    ? 'bg-white/15 text-white'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {g.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onToggleMusic}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="copy-panel flex items-center gap-2 px-3 py-1.5 text-xs text-white/85 transition-colors hover:text-white"
        >
          <Music size={14} strokeWidth={2} />
          <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
            {[0.5, 1, 0.65].map((h, i) => (
              <span
                key={i}
                className="eq-bar w-[2px] rounded-full bg-current"
                style={{
                  height: '100%',
                  transform: `scaleY(${isPlaying ? h : 0.15})`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </span>
          <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
      </div>
    </nav>
  )
}
