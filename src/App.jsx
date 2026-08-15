const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'lore', label: 'Lore' },
  { id: 'no-roadmap', label: 'No Roadmap' },
  { id: 'journal', label: 'Journal' },
  { id: 'token', label: 'Token' },
]

function Section({ id, label }) {
  return (
    <section
      id={id}
      className="min-h-screen w-full flex items-center justify-center scroll-mt-16"
    >
      <h1 className="text-5xl md:text-7xl font-bold text-center">{label}</h1>
    </section>
  )
}

function App() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <ul className="flex flex-wrap justify-center gap-6 py-4 text-white text-sm md:text-base">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-purple-400 transition-colors">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="pt-16">
        {sections.map((s) => (
          <Section key={s.id} id={s.id} label={s.label} />
        ))}
      </main>
    </>
  )
}

export default App
