import rawPortfolio from '../data/portfolio.json' with { type: 'json' }

export interface Chart {
  id: string
  title: string
  type: 'bar' | 'line'
  caption: string
  unit: string
  source: string
  illustrative: boolean
  series: { label: string; value: number }[]
}

export interface Project {
  slug: string
  title: string
  summary: string
  category: string
  tools: string[]
  status: 'unconfirmed' | 'in-progress' | 'unfinished' | 'complete'
  contentDraft: boolean
  dataKind: 'synthetic' | 'unconfirmed' | 'not-applicable' | 'real'
  preview: 'tasks' | 'music' | 'report'
  image: string | null
  links: { github: string | null; demo: string | null }
  caseStudy: {
    overview: string
    question: string
    approach: string[]
    codeExample: { caption: string; content: string } | null
    demonstration: {
      description: string
      output: { caption: string; content: string } | null
    }
    results: string[]
    limitations: string[]
    nextSteps: string[]
  }
  charts: Chart[]
}

export interface Portfolio {
  profile: {
    name: string
    nameIsPlaceholder: boolean
    role: string
    description: string
    about: string[]
    location: string
    availability: string
  }
  contact: { email: string | null; github: string | null; resume: string | null }
  skills: {
    category: string
    items: { name: string; description: string; projectSlugs: string[] }[]
  }[]
  projects: Project[]
}

function fail(path: string, message: string): never {
  throw new Error(`Invalid portfolio content at ${path}: ${message}`)
}

function record(value: unknown, path: string, keys: readonly string[]): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value))
    fail(path, 'expected an object')
  for (const key of Object.keys(value))
    if (!keys.includes(key)) fail(`${path}.${key}`, 'unknown field')
  return value as Record<string, unknown>
}

function text(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) fail(path, 'expected non-empty text')
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))
    fail(path, 'control characters are not allowed')
  return value.trim()
}

function boolean(value: unknown, path: string): boolean {
  if (typeof value !== 'boolean') fail(path, 'expected true or false')
  return value
}

function list<T>(value: unknown, path: string, parse: (item: unknown, path: string) => T, minimum = 0): T[] {
  if (!Array.isArray(value) || value.length < minimum)
    fail(path, `expected an array with at least ${minimum} item(s)`)
  return value.map((item, index) => parse(item, `${path}[${index}]`))
}

function choice<T extends string>(value: unknown, path: string, options: readonly T[]): T {
  if (typeof value !== 'string' || !options.includes(value as T))
    fail(path, `expected one of: ${options.join(', ')}`)
  return value as T
}

function unique(values: string[], path: string): void {
  const seen = new Set<string>()
  for (const value of values) {
    const normalized = value.toLowerCase()
    if (seen.has(normalized)) fail(path, `duplicate value: ${value}`)
    seen.add(normalized)
  }
}

function identifier(value: unknown, path: string): string {
  const result = text(value, path)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result))
    fail(path, 'use lowercase letters, numbers and single hyphens')
  return result
}

function httpsUrl(value: unknown, path: string): string | null {
  if (value === null) return null
  const result = text(value, path)
  if (result !== value || /[\s\\]/.test(result)) fail(path, 'URL contains whitespace or a backslash')
  let url: URL
  try {
    url = new URL(result)
    if (/[\u0000-\u0020\u007f]/.test(decodeURIComponent(result)))
      fail(path, 'URL contains encoded control characters or whitespace')
  } catch {
    fail(path, 'expected a valid HTTPS URL')
  }
  if (url.protocol !== 'https:' || !url.hostname || url.username || url.password)
    fail(path, 'expected an HTTPS URL without embedded credentials')
  return result
}

function assetPath(value: unknown, path: string, extensions: string): string | null {
  if (value === null) return null
  const result = text(value, path)
  const pattern = new RegExp(`^/(?:[A-Za-z0-9_-]+/)*[A-Za-z0-9][A-Za-z0-9._-]*\\.(?:${extensions})$`, 'i')
  if (result !== value || !pattern.test(result))
    fail(path, 'expected a local asset path without traversal, query strings or URL schemes')
  return result
}

function email(value: unknown, path: string): string | null {
  if (value === null) return null
  const result = text(value, path)
  // Keep this a plain address: a mailto query belongs nowhere in the data file.
  if (result !== value || result.length > 254 ||
    !/^[A-Za-z0-9.!$'*+\-/=^_`{|}~]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(result))
    fail(path, 'expected a plain email address without a query or control characters')
  return result
}

function contentBlock(value: unknown, path: string): { caption: string; content: string } | null {
  if (value === null) return null
  const block = record(value, path, ['caption', 'content'])
  text(block.content, `${path}.content`)
  // Preserve indentation and final newlines in real code/output excerpts.
  return { caption: text(block.caption, `${path}.caption`), content: block.content as string }
}

function chart(value: unknown, path: string): Chart {
  const input = record(value, path, ['id', 'title', 'type', 'caption', 'unit', 'source', 'illustrative', 'series'])
  const type = choice(input.type, `${path}.type`, ['bar', 'line'])
  const result: Chart = {
    id: identifier(input.id, `${path}.id`),
    title: text(input.title, `${path}.title`),
    type,
    caption: text(input.caption, `${path}.caption`),
    unit: text(input.unit, `${path}.unit`),
    source: text(input.source, `${path}.source`),
    illustrative: boolean(input.illustrative, `${path}.illustrative`),
    series: list(input.series, `${path}.series`, (item, itemPath) => {
      const point = record(item, itemPath, ['label', 'value'])
      if (typeof point.value !== 'number' || !Number.isFinite(point.value))
        fail(`${itemPath}.value`, 'expected a finite number')
      if (type === 'bar' && point.value < 0)
        fail(`${itemPath}.value`, 'bar values must be non-negative')
      return { label: text(point.label, `${itemPath}.label`), value: point.value }
    }, type === 'line' ? 2 : 1),
  }
  unique(result.series.map((point) => point.label), `${path}.series`)
  if (result.illustrative) {
    const disclosure = /illustrative|fictional|synthetic/i
    if (!disclosure.test(result.caption) || !disclosure.test(result.source))
      fail(path, 'illustrative charts must disclose that in both caption and source')
  }
  return result
}

function project(value: unknown, path: string): Project {
  const input = record(value, path, ['slug', 'title', 'summary', 'category', 'tools', 'status', 'contentDraft', 'dataKind', 'preview', 'image', 'links', 'caseStudy', 'charts'])
  const links = record(input.links, `${path}.links`, ['github', 'demo'])
  const study = record(input.caseStudy, `${path}.caseStudy`, ['overview', 'question', 'approach', 'codeExample', 'demonstration', 'results', 'limitations', 'nextSteps'])
  const demonstration = record(study.demonstration, `${path}.caseStudy.demonstration`, ['description', 'output'])
  const result: Project = {
    slug: identifier(input.slug, `${path}.slug`),
    title: text(input.title, `${path}.title`),
    summary: text(input.summary, `${path}.summary`),
    category: text(input.category, `${path}.category`),
    tools: list(input.tools, `${path}.tools`, text),
    status: choice(input.status, `${path}.status`, ['unconfirmed', 'in-progress', 'unfinished', 'complete']),
    contentDraft: boolean(input.contentDraft, `${path}.contentDraft`),
    dataKind: choice(input.dataKind, `${path}.dataKind`, ['synthetic', 'unconfirmed', 'not-applicable', 'real']),
    preview: choice(input.preview, `${path}.preview`, ['tasks', 'music', 'report']),
    image: assetPath(input.image, `${path}.image`, 'svg|png|jpe?g|webp|avif|gif'),
    links: {
      github: httpsUrl(links.github, `${path}.links.github`),
      demo: httpsUrl(links.demo, `${path}.links.demo`),
    },
    caseStudy: {
      overview: text(study.overview, `${path}.caseStudy.overview`),
      question: text(study.question, `${path}.caseStudy.question`),
      approach: list(study.approach, `${path}.caseStudy.approach`, text, 1),
      codeExample: contentBlock(study.codeExample, `${path}.caseStudy.codeExample`),
      demonstration: {
        description: text(demonstration.description, `${path}.caseStudy.demonstration.description`),
        output: contentBlock(demonstration.output, `${path}.caseStudy.demonstration.output`),
      },
      results: list(study.results, `${path}.caseStudy.results`, text, 1),
      limitations: list(study.limitations, `${path}.caseStudy.limitations`, text, 1),
      nextSteps: list(study.nextSteps, `${path}.caseStudy.nextSteps`, text, 1),
    },
    charts: list(input.charts, `${path}.charts`, chart),
  }
  if (['about', 'contact', 'skills', 'projects', 'resume', 'assets', 'api', '404', 'index'].includes(result.slug))
    fail(`${path}.slug`, 'this slug is reserved')
  unique(result.tools, `${path}.tools`)
  if ((result.status === 'unconfirmed' || result.dataKind === 'unconfirmed') && !result.contentDraft)
    fail(`${path}.contentDraft`, 'unconfirmed content must be marked as a draft')
  if (result.dataKind === 'synthetic' && !/synthetic/i.test(result.summary))
    fail(`${path}.summary`, 'synthetic data must be disclosed in the summary')
  if (result.charts.length && ['unconfirmed', 'not-applicable'].includes(result.dataKind))
    fail(`${path}.charts`, 'confirm the data kind before publishing charts')
  if (result.charts.some((item) => item.illustrative) && result.dataKind !== 'synthetic')
    fail(`${path}.dataKind`, 'illustrative data must be identified as synthetic')
  return result
}

export function validatePortfolio(value: unknown): Portfolio {
  const input = record(value, 'portfolio', ['profile', 'contact', 'skills', 'projects'])
  const profile = record(input.profile, 'portfolio.profile', ['name', 'nameIsPlaceholder', 'role', 'description', 'about', 'location', 'availability'])
  const contact = record(input.contact, 'portfolio.contact', ['email', 'github', 'resume'])
  const resume = contact.resume === null || (typeof contact.resume === 'string' && contact.resume.startsWith('/'))
    ? assetPath(contact.resume, 'portfolio.contact.resume', 'pdf')
    : httpsUrl(contact.resume, 'portfolio.contact.resume')
  const result: Portfolio = {
    profile: {
      name: text(profile.name, 'portfolio.profile.name'),
      nameIsPlaceholder: boolean(profile.nameIsPlaceholder, 'portfolio.profile.nameIsPlaceholder'),
      role: text(profile.role, 'portfolio.profile.role'),
      description: text(profile.description, 'portfolio.profile.description'),
      about: list(profile.about, 'portfolio.profile.about', text, 1),
      location: text(profile.location, 'portfolio.profile.location'),
      availability: text(profile.availability, 'portfolio.profile.availability'),
    },
    contact: {
      email: email(contact.email, 'portfolio.contact.email'),
      github: httpsUrl(contact.github, 'portfolio.contact.github'),
      resume,
    },
    skills: list(input.skills, 'portfolio.skills', (value, path) => {
      const group = record(value, path, ['category', 'items'])
      const items = list(group.items, `${path}.items`, (value, itemPath) => {
        const item = record(value, itemPath, ['name', 'description', 'projectSlugs'])
        const projectSlugs = list(item.projectSlugs, `${itemPath}.projectSlugs`, identifier, 1)
        unique(projectSlugs, `${itemPath}.projectSlugs`)
        return { name: text(item.name, `${itemPath}.name`), description: text(item.description, `${itemPath}.description`), projectSlugs }
      }, 1)
      unique(items.map(item => item.name), `${path}.items`)
      return { category: text(group.category, `${path}.category`), items }
    }, 1),
    projects: list(input.projects, 'portfolio.projects', project, 1),
  }
  unique(result.projects.map((item) => item.slug), 'portfolio.projects')
  unique(result.skills.map(group => group.category), 'portfolio.skills')
  const slugs = new Set(result.projects.map(item => item.slug))
  for (const [groupIndex, group] of result.skills.entries())
    for (const [itemIndex, item] of group.items.entries())
      for (const slug of item.projectSlugs)
        if (!slugs.has(slug)) fail(`portfolio.skills[${groupIndex}].items[${itemIndex}].projectSlugs`, `unknown project: ${slug}`)
  unique(result.projects.flatMap((item) => item.charts.map((entry) => entry.id)), 'portfolio.projects.charts')
  return result
}

export const portfolio: Portfolio = validatePortfolio(rawPortfolio)
