import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { data, type Project } from './data'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canHover = window.matchMedia('(hover: hover)').matches
const pad = (n: number) => String(n).padStart(2, '0')
const d = (i: number) => ({ '--d': i }) as CSSProperties

function Nav() {
  const [open, setOpen] = useState(false)
  const { logo, status, links } = data.nav
  return (
    <nav className="nav">
      <a className="logo" href="#top">{logo}<b>.</b></a>
      <div className="navlinks">{links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}<Resume /></div>
      <span className="status label"><i className="dot" /> {status}</span>
      <button className="menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? 'close' : 'menu'}</button>
      <div id="mobile-nav" className={`mobile${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}<Resume />
      </div>
    </nav>
  )
}

const SOON = 'resume-soon'

function Resume({ className }: { className?: string }) {
  const { label, url } = data.resume
  return url
    ? <a className={className} href={url} target="_blank" rel="noreferrer">{label}</a>
    : <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(SOON))}>{label}</button>
}

// one toast at page level, so it still shows when the click came from the (closing) mobile menu
function SoonToast() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let t = 0
    const on = () => { setShow(true); clearTimeout(t); t = window.setTimeout(() => setShow(false), 2500) }
    window.addEventListener(SOON, on)
    return () => { window.removeEventListener(SOON, on); clearTimeout(t) }
  }, [])
  return <div className="soon"><span className={`toast${show ? ' show' : ''}`} role="status">{show ? data.resume.soon : ''}</span></div>
}

function Letters({ text, start }: { text: string; start: number }) {
  return [...text].map((c, i) => <span key={i} className="ch" style={{ '--i': start + i } as CSSProperties}>{c}</span>)
}

function Hero() {
  const h = data.hero
  const [k, setK] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setK(x => (x + 1) % h.roles.length), 2000)
    return () => clearInterval(id)
  }, [h.roles.length])
  return (
    <header className="hero" id="top">
      <div className="badge" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id="pc" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs><text><textPath href="#pc">{h.badge}</textPath></text></svg>
        <span className="core">↓</span>
      </div>
      <span className="star" aria-hidden="true">✦</span>
      <p className="kicker label">{h.kicker}</p>
      <h1 aria-label={`${h.firstName} ${h.lastName}`}>
        <span className="w" aria-hidden="true"><Letters text={h.firstName} start={0} /></span>{' '}
        <mark className="w" aria-hidden="true"><Letters text={h.lastName} start={h.firstName.length} /></mark>
        <span className="pill label" aria-hidden="true">{h.location}</span>
      </h1>
      {/* key remount replays the flip animation on every word change */}
      <p className="role">{h.rolePrefix} <span className="rot" key={k}>{h.roles[k]}</span> {h.roleSuffix}</p>
      <div className="cta">
        <a className="btn" href={h.primaryCta.href}>{h.primaryCta.label}</a>
        <a className="btn ghost" href={h.secondaryCta.href}>{h.secondaryCta.label}</a>
        <Resume className="btn ghost" />
      </div>
    </header>
  )
}

function Band({ cls, items }: { cls: string; items: string[] }) {
  const loop = [...items, ...items, ...items, ...items] // track slides -50%, so content must repeat
  return <div className={`band ${cls}`}><div className="track">{loop.map((t, i) => <span key={i} className="item">{t}</span>)}</div></div>
}

function Clock() {
  const tz = data.about.timeZone
  const read = () => { try { return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }) } catch { return '--:--' } }
  const [t, setT] = useState(read)
  useEffect(() => { const id = setInterval(() => setT(read()), 30000); return () => clearInterval(id) })
  const hr = +t.slice(0, 2)
  const msg = Number.isNaN(hr) ? 'probably awake' : hr < 6 ? 'definitely should be asleep' : hr < 12 ? 'coffee in hand' : hr < 18 ? 'deep in code' : 'night-owl mode on'
  return <><div className="t">{t}</div><span className="label">{msg}</span></>
}

function SectionHead({ title, n }: { title: string; n: number }) {
  return <div className="sh reveal"><h2>{title}</h2><span className="label">({pad(n)})</span></div>
}

function About() {
  const a = data.about
  return (
    <section id="about">
      <SectionHead title={a.heading} n={1} />
      <div className="bento">
        <div className="tile photo reveal" style={d(0)}>
          {a.photo ? <img src={a.photo} alt={`${data.hero.firstName} ${data.hero.lastName}`} /> : <><i className="c c1" /><i className="c c2" /><span className="label">{a.photoLabel}</span></>}
        </div>
        <div className="tile bio reveal" style={d(1)}><p>{a.bio}</p><p>{a.bioMore}</p></div>
        <div className="tile now reveal" style={d(2)}>
          <h3 className="label">currently</h3>
          <ul>{a.currently.map(c => <li key={c.label}><b>{c.label}</b><span>{c.value}</span></li>)}</ul>
        </div>
        <div className="tile kit reveal" style={d(3)}>
          <h3 className="label">toolkit</h3>
          <div className="chips">{a.toolkit.map(t => <span key={t} className="chip">{t}</span>)}</div>
        </div>
        <div className="tile clock reveal" style={d(4)}><h3 className="label">my local time</h3><Clock /></div>
      </div>
    </section>
  )
}

function tilt(e: MouseEvent<HTMLAnchorElement>) {
  if (reduce || !canHover) return
  const c = e.currentTarget, r = c.getBoundingClientRect()
  c.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`)
  c.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 12}deg`)
}
function untilt(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function Card({ p, i }: { p: Project; i: number }) {
  const external = p.url.startsWith('http')
  return (
    <a className={`card reveal${p.wide ? ' wide' : ''}`} href={p.url} style={d(i % 2)} onMouseMove={tilt} onMouseLeave={untilt}
      {...(external && { target: '_blank', rel: 'noreferrer' })}>
      <div className={`thumb ${p.accent}`}>
        {p.image ? <img src={p.image} alt="" /> : <><i className="shape s1" /><i className="shape s2" />{p.accent === 'orange' && <i className="shape s3" />}</>}
        <span className="view" aria-hidden="true">↗</span>
      </div>
      <div className="meta"><h3>{p.title}</h3><span className="label">{p.year}</span></div>
      <p>{p.description}</p>
    </a>
  )
}

function Contact() {
  const c = data.contact
  const [toast, setToast] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(c.email) } catch { /* clipboard blocked: the mailto link still works */ }
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }
  return (
    <section id="contact" className="contact">
      <p className="label reveal">{c.kicker}</p>
      <a className="big reveal" href={`mailto:${c.email}`}>{c.cta} <span className="arr">↗</span></a>
      <div className="row reveal">
        <button className="btn" onClick={copy}>{c.copyLabel}</button>
        {c.socials.map(s => <a key={s.label} className="soc" href={s.url} {...(s.url.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}>{s.label} ↗</a>)}
      </div>
      <p style={{ margin: '16px 0 0' }}><span className={`toast${toast ? ' show' : ''}`} role="status">{toast ? `${c.email} — ${c.copiedMessage}` : ''}</span></p>
    </section>
  )
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduce || !canHover) return
    let x = -100, y = -100, cx = x, cy = y, raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      ref.current?.classList.toggle('big2', !!(e.target as Element).closest?.('a,button,mark,.chip'))
    }
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate(${cx}px,${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    loop()
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  return reduce || !canHover ? null : <div className="cursor" ref={ref} aria-hidden="true" />
}

export default function App() {
  useEffect(() => {
    document.title = data.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.meta.description)
    const els = document.querySelectorAll('.reveal')
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="site">
      <Cursor />
      <SoonToast />
      <div className="in-w"><Nav /><Hero /></div>

      <div className="marquee" aria-hidden="true">
        <Band cls="a" items={data.marquee.skills} />
        <Band cls="b" items={data.marquee.shoutouts} />
      </div>

      <main className="in-w">
        <About />

        <section id="work">
          <SectionHead title={data.work.heading} n={data.work.projects.length} />
          <div className="work">{data.work.projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}</div>
          <div className="more reveal"><a className="btn" href={data.work.more.url} target="_blank" rel="noreferrer">{data.work.more.label}</a></div>
        </section>

        <Contact />

        <footer className="label"><span>{data.footer.text}</span><a href="#top">{data.footer.backToTop}</a></footer>
      </main>
    </div>
  )
}
