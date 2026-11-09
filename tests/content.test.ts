import assert from 'node:assert/strict'
import test from 'node:test'
import { validatePortfolio, type Portfolio, type Project } from '../src/lib/validate-content.ts'

// Contract fixtures stay separate from the editable public portfolio content.
const projectFixture: Project = {
  slug: 'task-example',
  title: 'Example task project',
  summary: 'An example project whose details are being documented.',
  category: 'Programming',
  tools: [],
  status: 'unconfirmed',
  contentDraft: true,
  dataKind: 'not-applicable',
  preview: 'tasks',
  image: null,
  links: { github: null, demo: null },
  caseStudy: {
    overview: 'A small example project used to exercise the case-study content contract.',
    question: 'What should this example help someone do?',
    approach: ['Document the implementation.'],
    codeExample: null,
    demonstration: {
      description: 'No working demonstration has been supplied for this fixture.',
      output: null,
    },
    results: ['Verified results are pending.'],
    limitations: ['The example has not been evaluated.'],
    nextSteps: ['Evaluate and document the example.'],
  },
  charts: [],
}

const fixture: Portfolio = {
  profile: {
    name: 'Example Student',
    nameIsPlaceholder: false,
    role: 'Student',
    description: 'A student portfolio used to exercise the content contract.',
    about: ['This is test data.'],
    location: 'Example location',
    availability: 'Working on student projects.',
  },
  contact: { email: null, github: null, resume: null },
  skills: [{
    category: 'Programming',
    items: [{
      name: 'Example language',
      description: 'Demonstrated in the example task project.',
      projectSlugs: ['task-example'],
    }],
  }],
  projects: [
    structuredClone(projectFixture),
    {
      ...structuredClone(projectFixture),
      slug: 'synthetic-example',
      title: 'Example dashboard',
      summary: 'A dashboard showing illustrative synthetic data.',
      dataKind: 'synthetic',
      preview: 'music',
      charts: [{
        id: 'example-minutes',
        title: 'Example activity',
        type: 'bar',
        caption: 'Illustrative synthetic minutes for two sample days.',
        unit: 'minutes',
        source: 'Fictional data created for this test fixture.',
        illustrative: true,
        series: [{ label: 'Day 1', value: 24 }, { label: 'Day 2', value: 38 }],
      }],
    },
    {
      ...structuredClone(projectFixture),
      slug: 'report-example',
      title: 'Example report',
      status: 'in-progress',
      dataKind: 'unconfirmed',
      preview: 'report',
    },
  ],
}

function copy() {
  return structuredClone(fixture)
}

test('valid content accepts an updated public name, confirmed tools and completed status', () => {
  const data = copy()
  data.profile.name = 'Another Public Name'
  data.projects[0].tools = ['C++17', 'Qt Widgets']
  data.projects[0].status = 'complete'
  data.projects[0].contentDraft = false
  const result = validatePortfolio(data)
  assert.equal(result.profile.name, data.profile.name)
  assert.deepEqual(result.projects[0].tools, data.projects[0].tools)
  assert.equal(result.projects[0].status, 'complete')
  assert.equal(result.projects[0].contentDraft, false)
})

test('an additional project can be added through the same data contract', () => {
  const data = copy()
  const extra = structuredClone(data.projects[0])
  extra.slug = 'another-student-project'
  extra.title = 'Another student project'
  data.projects.push(extra)
  assert.equal(validatePortfolio(data).projects.length, fixture.projects.length + 1)
})

test('an unfinished project retains its explicit status', () => {
  const data = copy()
  data.projects[1].status = 'unfinished'
  assert.equal(validatePortfolio(data).projects[1].status, 'unfinished')
})

test('skills retain their demonstrated project references and reject nonexistent evidence', () => {
  const data = copy()
  data.skills[0].items[0].projectSlugs.push('report-example')
  const result = validatePortfolio(data)
  assert.deepEqual(result.skills[0].items[0].projectSlugs, ['task-example', 'report-example'])
  data.skills[0].items[0].projectSlugs.push('missing-evidence-project')
  assert.throws(() => validatePortfolio(data), /skills.*projectSlugs/)
})

test('skills need a category, item description and at least one evidence reference', () => {
  const cases: [string, (data: any) => void][] = [
    ['skills', data => { delete data.skills }],
    ['skills', data => { data.skills = [] }],
    ['skills[0].category', data => { data.skills[0].category = ' ' }],
    ['skills[0].items', data => { data.skills[0].items = [] }],
    ['skills[0].items[0].name', data => { data.skills[0].items[0].name = '' }],
    ['skills[0].items[0].description', data => { data.skills[0].items[0].description = ' ' }],
    ['skills[0].items[0].projectSlugs', data => { data.skills[0].items[0].projectSlugs = [] }],
  ]
  for (const [path, change] of cases) {
    const data = copy()
    change(data)
    assert.throws(() => validatePortfolio(data), (error: Error) => error.message.includes(path))
  }
})

test('missing optional destinations are represented by null and remain absent', () => {
  const result = validatePortfolio(copy())
  assert.deepEqual(result.projects[1].links, { github: null, demo: null })
  const data = copy()
  data.contact.email = 'student+portfolio@example.com'
  data.contact.resume = '/assets/student-resume.pdf'
  data.projects[0].image = '/assets/tasks-preview.svg'
  data.projects[0].links.demo = 'https://example.com/project?mode=preview#details'
  assert.equal(validatePortfolio(data).contact.email, data.contact.email)
})

test('case studies accept nullable or explicitly captioned code and sample output', () => {
  const empty = validatePortfolio(copy()).projects[0].caseStudy
  assert.equal(empty.codeExample, null)
  assert.equal(empty.demonstration.output, null)

  const data = copy()
  data.projects[0].caseStudy.codeExample = {
    caption: 'An illustrative code excerpt for this fixture.',
    content: 'total = quantity * unit_price',
  }
  data.projects[0].caseStudy.demonstration.output = {
    caption: 'Fictional sample output for this fixture.',
    content: 'Total: 42\n',
  }
  const result = validatePortfolio(data).projects[0].caseStudy
  assert.deepEqual(result.codeExample, data.projects[0].caseStudy.codeExample)
  assert.deepEqual(result.demonstration.output, data.projects[0].caseStudy.demonstration.output)
})

test('case-study evidence requires descriptions, captions and nonempty content', () => {
  const cases: [string, (data: any) => void][] = [
    ['caseStudy.overview', data => { delete data.projects[0].caseStudy.overview }],
    ['caseStudy.demonstration.description', data => { data.projects[0].caseStudy.demonstration.description = ' ' }],
    ['caseStudy.codeExample.caption', data => { data.projects[0].caseStudy.codeExample = { caption: '', content: 'print(42)' } }],
    ['caseStudy.codeExample.content', data => { data.projects[0].caseStudy.codeExample = { caption: 'Example code.', content: ' ' } }],
    ['caseStudy.codeExample.extra', data => { data.projects[0].caseStudy.codeExample = { caption: 'Example code.', content: 'print(42)', extra: true } }],
    ['caseStudy.demonstration.output.caption', data => { data.projects[0].caseStudy.demonstration.output = { caption: ' ', content: '42' } }],
    ['caseStudy.demonstration.output.content', data => { data.projects[0].caseStudy.demonstration.output = { caption: 'Example output.' } }],
    ['caseStudy.demonstration.output.extra', data => { data.projects[0].caseStudy.demonstration.output = { caption: 'Example output.', content: '42', extra: true } }],
  ]
  for (const [path, change] of cases) {
    const data = copy()
    change(data)
    assert.throws(() => validatePortfolio(data), (error: Error) => error.message.includes(path))
  }
})

test('malformed structures and unknown fields fail with a useful content path', () => {
  for (const value of [null, [], 'portfolio', 42])
    assert.throws(() => validatePortfolio(value), /portfolio: expected an object/)
  const cases: [string, (data: any) => void][] = [
    ['profile.name', (data) => { data.profile.name = ' ' }],
    ['profile.nameIsPlaceholder', (data) => { data.profile.nameIsPlaceholder = 'true' }],
    ['profile.about', (data) => { data.profile.about = [] }],
    ['projects', (data) => { data.projects = [] }],
    ['projects[0].tools', (data) => { data.projects[0].tools = 'Python' }],
    ['projects[0].status', (data) => { data.projects[0].status = 'done' }],
    ['projects[0].links', (data) => { data.projects[0].links = [] }],
    ['projects[0].caseStudy.results[0]', (data) => { data.projects[0].caseStudy.results = [5] }],
    ['projects[0].summaryTypo', (data) => { data.projects[0].summaryTypo = 'typo' }],
    ['contact.email', (data) => { delete data.contact.email }],
  ]
  for (const [path, change] of cases) {
    const data = copy()
    change(data)
    assert.throws(() => validatePortfolio(data), (error: Error) => error.message.includes(path))
  }
})

test('external links reject executable schemes, insecure URLs and disguised credentials', () => {
  for (const url of [
    'javascript:alert(1)', 'data:text/html,test', 'http://example.com',
    '//example.com', 'https://user:password@example.com',
    ' https://example.com', 'https://example.com\\@evil.example',
    'https://example.com/%0d%0aInjected', 'https://example.com/%ZZ',
  ]) {
    const data = copy()
    data.projects[0].links.github = url
    assert.throws(() => validatePortfolio(data), /projects\[0\]\.links\.github/)
  }
})

test('email addresses reject mailto queries and header injection', () => {
  for (const address of ['mailto:student@example.com', 'student@example.com?subject=test', 'student@example.com\r\nBcc:other@example.com', 'student%0a@example.com']) {
    const data = copy()
    data.contact.email = address
    assert.throws(() => validatePortfolio(data), /contact.email/)
  }
})

test('local asset paths reject traversal, remote resources and active document formats', () => {
  for (const path of ['//example.com/image.svg', '/assets/../image.svg', '/assets/%2e%2e/image.svg', 'https://example.com/image.svg', '/assets/image.svg?mode=test', '/assets/page.html']) {
    const data = copy()
    data.projects[0].image = path
    assert.throws(() => validatePortfolio(data), /projects\[0\]\.image/)
  }
  const data = copy()
  data.contact.resume = '/assets/resume.html'
  assert.throws(() => validatePortfolio(data), /contact.resume/)
})

test('project slugs must be unique, route-safe and nonreserved', () => {
  for (const slug of ['../escape', 'Not-lowercase', 'two--hyphens', 'projects', '404']) {
    const data = copy()
    data.projects[0].slug = slug
    assert.throws(() => validatePortfolio(data), /projects\[0\]\.slug/)
  }
  const data = copy()
  data.projects[1].slug = data.projects[0].slug
  assert.throws(() => validatePortfolio(data), /duplicate value/)
})

test('unconfirmed and synthetic content cannot silently lose its disclosure', () => {
  const unconfirmed = copy()
  unconfirmed.projects[0].contentDraft = false
  assert.throws(() => validatePortfolio(unconfirmed), /contentDraft/)
  const synthetic = copy()
  synthetic.projects[1].summary = 'A dashboard of listening activity.'
  assert.throws(() => validatePortfolio(synthetic), /summary/)
  const undisclosed = copy()
  undisclosed.projects[1].dataKind = 'real'
  assert.throws(() => validatePortfolio(undisclosed), /dataKind/)
  const chart = copy()
  chart.projects[1].charts[0].caption = 'Listening minutes across four days.'
  assert.throws(() => validatePortfolio(chart), /caption and source/)
})

test('chart values must be finite, bars non-negative, and series labels unique', () => {
  for (const value of [NaN, Infinity, -Infinity, -1]) {
    const data = copy()
    data.projects[1].charts[0].series[0].value = value
    assert.throws(() => validatePortfolio(data), /series\[0\]\.value/)
  }
  const data = copy()
  data.projects[1].charts[0].series[1].label = 'day 1'
  assert.throws(() => validatePortfolio(data), /duplicate value/)
  const line = copy()
  line.projects[1].charts[0].type = 'line'
  line.projects[1].charts[0].series[0].value = -1
  assert.equal(validatePortfolio(line).projects[1].charts[0].series[0].value, -1)
})

test('charts need a source, units, valid series and unique ids', () => {
  const cases: ((data: any) => void)[] = [
    (data) => { data.projects[1].charts[0].source = '' },
    (data) => { data.projects[1].charts[0].unit = '' },
    (data) => { data.projects[1].charts[0].series = [] },
    (data) => { data.projects[1].charts[0].series[0].value = '24' },
    (data) => { data.projects[1].charts[0].series[0].extra = true },
    (data) => { data.projects[1].charts.push(structuredClone(data.projects[1].charts[0])) },
    (data) => { data.projects[1].charts[0].type = 'line'; data.projects[1].charts[0].series.length = 1 },
    (data) => { data.projects[1].dataKind = 'unconfirmed' },
  ]
  for (const change of cases) {
    const data = copy()
    change(data)
    assert.throws(() => validatePortfolio(data), /Invalid portfolio content/)
  }
})
