import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'

function truncate(address) {
  return address.length > 14 ? `${address.slice(0, 8)}…${address.slice(-6)}` : address
}

export default function TokenExtras({ ca, dexscreenerUrl }) {
  const [copied, setCopied] = useState(false)

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(ca)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="copy-panel flex max-w-full items-center gap-2 px-4 py-2.5">
        <span className="whitespace-nowrap font-mono text-xs text-white/80 sm:text-sm" title={ca}>
          {truncate(ca)}
        </span>
        <button
          type="button"
          onClick={copyCA}
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-white/85 transition-colors hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <a
        href={dexscreenerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="copy-panel flex items-center gap-2 px-4 py-2 text-sm text-white/85 transition-colors hover:text-white"
      >
        View on Dexscreener
        <ExternalLink size={14} />
      </a>
    </div>
  )
}
