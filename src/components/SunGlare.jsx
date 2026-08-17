export default function SunGlare() {
  return (
    <div
      className="sun-glare pointer-events-none fixed -top-24 -right-24 z-10"
      style={{
        width: '46vw',
        height: '46vw',
        maxWidth: 620,
        maxHeight: 620,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(255,226,170,0.65) 0%, rgba(255,196,120,0.28) 40%, rgba(255,196,120,0) 72%)',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  )
}
