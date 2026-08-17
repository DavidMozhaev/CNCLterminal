import { useEffect, useRef } from 'react'

const COUNT = 46

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const rand = (a, b) => a + Math.random() * (b - a)

    const makeParticle = (spawnAtBottom) => ({
      x: rand(0, width),
      y: spawnAtBottom ? height + rand(0, 40) : rand(0, height),
      r: rand(0.6, 2.1),
      speed: rand(6, 18) / 60,
      drift: rand(-0.15, 0.15),
      phase: rand(0, Math.PI * 2),
      sway: rand(6, 22),
      baseAlpha: rand(0.25, 0.75),
    })

    const particles = Array.from({ length: COUNT }, () => makeParticle(false))

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.speed
        p.phase += 0.01
        const x = p.x + Math.sin(p.phase) * p.sway * 0.02
        const twinkle = 0.6 + 0.4 * Math.sin(p.phase * 1.7)
        const alpha = p.baseAlpha * twinkle

        if (p.y < -20) {
          Object.assign(p, makeParticle(true))
        }

        const gradient = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4)
        gradient.addColorStop(0, `rgba(255, 244, 214, ${alpha})`)
        gradient.addColorStop(1, 'rgba(255, 244, 214, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
