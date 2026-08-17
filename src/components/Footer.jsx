import { SiX, SiYoutube, SiTelegram } from 'react-icons/si'
import { socialLinks } from '../scenes'

const ICONS = {
  x: SiX,
  youtube: SiYoutube,
  telegram: SiTelegram,
}

export default function Footer() {
  return (
    <footer className="relative z-30 flex flex-col items-center gap-6 bg-gradient-to-b from-transparent to-black/80 px-6 pt-24 pb-14">
      <p className="text-xs font-semibold tracking-[0.35em] text-white/60 uppercase">Elsewhere</p>
      <div className="flex items-center gap-4">
        {socialLinks.map((link) => {
          const Icon = ICONS[link.id]
          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="copy-panel flex h-11 w-11 items-center justify-center text-white/85 transition-colors hover:text-white"
            >
              <Icon size={18} />
            </a>
          )
        })}
      </div>
    </footer>
  )
}
