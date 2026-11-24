// Every word on the portfolio lives here. Edit this file only — the components just read it.
// Voice (from the "Main Character" design system): lowercase, short, a bit cheeky. Glyphs ✦ ↗ → ● over emoji.

// Files in /public: write them as `${base}name.png` so they keep working if the site ever moves to a sub-path.
const base = import.meta.env.BASE_URL

export type Accent = 'lime' | 'pink' | 'lilac' | 'orange'

export interface Project {
  title: string
  year: string
  description: string
  url: string
  /** Wide cards span 2 columns on laptop+. Two wide cards per four looks best. */
  wide?: boolean
  /** Screenshot path (put files in /public, e.g. `${base}work/brew.png`). Without one, a CSS-art thumb is drawn. */
  image?: string
  accent: Accent
}

export const data = {
  meta: {
    title: 'Riya Pal — portfolio',
    description: 'Riya Pal — Python & React developer bridging legacy technology with agentic AI (LangChain, LangGraph, Pydantic AI).',
  },

  nav: {
    logo: 'rp',
    status: 'open to work',
    links: [
      { label: 'work', href: '#work' },
      { label: 'about', href: '#about' },
      { label: 'contact', href: '#contact' },
    ],
  },

  hero: {
    kicker: "hey, i'm ↓",
    firstName: 'Riya',
    lastName: 'Pal', // gets the lime highlight
    rolePrefix: 'a',
    // 3–5, each under 18 chars; start each with a consonant so "a ___" reads right
    roles: ['python developer', 'gen ai engineer', 'react developer', 'problem solver'],
    roleSuffix: 'bridging legacy tech with agentic ai.',
    location: 'based in india',
    badge: 'scroll for the good stuff ✦ ',
    primaryCta: { label: 'see my work →', href: '#work' },
    secondaryCta: { label: 'say hi', href: '#contact' },
  },

  // Shown in the nav and the hero. While url is empty, clicking shows the "soon" message.
  // When ready: put the PDF at public/resume.pdf and set url: `${base}resume.pdf`.
  resume: {
    label: 'resume ↗',
    url: `${base}resume.pdf`,
    soon: 'resume dropping soon ✦ check back',
  },

  marquee: {
    skills: ['Python', 'React', 'TypeScript', 'Web Development', 'Agentic AI', 'Multi-Agent AI', 'LangChain', 'LangGraph', 'Pydantic AI'],
    shoutouts: ["let's build smarter automation", 'open to work', 'agents that ship', 'dm me'],
  },

  about: {
    heading: 'a bit about me',
    photo: `${base}profile.png`, // file in /public; empty shows the placeholder art
    photoLabel: 'your photo here',
    bio: 'Bridging Legacy Technology with Agentic AI — Exploring New Possibilities, Unlocking Smarter Automation.',
    bioMore: "I connect the systems companies already run with AI agents that can actually use them — turning scattered docs, code and data into knowledge graphs, and building assistants that answer with real sources. Less rip-and-replace, more making what's there smarter.",
    currently: [
      { label: 'building', value: 'ai agents in python with langgraph & langchain' },
      { label: 'working on', value: 'graphrag over neo4j + qdrant' },
      { label: 'exploring', value: 'mcp servers & multi-agent workflows' },
      { label: 'learning', value: 'agent evals, tracing & guardrails' },
    ],
    toolkit: ['Python', 'React', 'TypeScript', 'Web Development', 'Agentic AI', 'Multi-Agent AI', 'LangChain', 'LangGraph', 'Pydantic AI'],
    timeZone: 'Asia/Kolkata', // IANA name, drives the local-time tile
  },

  work: {
    heading: 'selected work',
    projects: [
      {
        title: 'Enterprise Knowledge Graph',
        year: '2026',
        description: 'AI knowledge assistant: ingests PDFs, docs & GitHub into a Neo4j graph + Qdrant index, then answers with GraphRAG and cites its sources.',
        url: 'https://github.com/Riya6395/enterprise-knowledge-graph',
        wide: true,
        accent: 'lime',
      },
    ] satisfies Project[],
    more: { label: 'explore more ↗', url: 'https://github.com/Riya6395' },
  },

  contact: {
    kicker: 'got an idea?',
    cta: "let's talk",
    email: 'riyapal963993@gmail.com',
    copyLabel: 'copy email',
    copiedMessage: 'copied ✦ talk soon',
    socials: [
      { label: 'linkedin', url: 'https://www.linkedin.com/in/riya-pal-84933a219/' },
      { label: 'github', url: 'https://github.com/Riya6395' },
    ],
  },

  footer: {
    text: `© ${new Date().getFullYear()} riya pal — made with too much chai & zero chill`,
    backToTop: 'back to top ↑',
  },
}
