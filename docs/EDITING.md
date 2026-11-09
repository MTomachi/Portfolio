# Updating the portfolio

## Edit existing content

Open `src/data/portfolio.json` in your editor. Keep valid JSON: quoted keys/text, commas between items, no comments or trailing commas. Run `npm run build` after changes; content errors identify the field that needs attention.

| Field | What to edit |
|---|---|
| `profile` | Public name, background, short introduction, About paragraphs and career interests. |
| `contact` | Plain email, HTTPS GitHub URL, résumé path/URL. Missing optional values are `null`, not `#` or empty text. |
| `skills` | Category, skill name/description and supporting `projectSlugs`. List demonstrated usage rather than proficiency scores. Every referenced project must exist. |
| `projects` | Cards and case-study pages use these same records. Array order is display order. |
| `caseStudy` | Overview, question/problem, approach/implementation, optional code, demonstration, results, limitations and next steps. Technologies come from `tools`; source links come from `links`. |

Statuses are `unconfirmed`, `in-progress`, `unfinished` or `complete`. Keep CSV **in-progress** until its actual completion is confirmed. `contentDraft` identifies a draft case study; unconfirmed status/data must remain a draft.

`dataKind` is `synthetic`, `real`, `not-applicable` or `unconfirmed`. Synthetic projects must explicitly contain “synthetic” in the summary. Data from the CSV and former music project is generated. Don't replace these disclosures with real-user/business claims.

## Add a project

1. Copy an existing object inside `projects`.
2. Give it a unique lowercase `slug` such as `another-project`; use letters/numbers and single hyphens. The slug becomes `/Portfolio/projects/another-project/`.
3. Replace its title, summary, tools, status and case-study text with verified facts. Keep unknowns explicit.
4. Set unavailable `image`, `links.github`, `links.demo`, `codeExample` and `demonstration.output` to `null`. Use `charts: []` without chart evidence.
5. Update skill evidence references only if that project demonstrates the skill.
6. Run the checks below. Both its homepage entry and page are generated automatically.

The `preview` field in existing records is retained for compatibility with the earlier content contract; current evidence rendering selects the actual image/output/unavailable state automatically. It does not create or certify a screenshot.

## Screenshots and résumé

Put original screenshots in `public/images/`, then set `image` to `/images/your-file.png`. Do not add `/Portfolio` to content paths: the path helper supplies it. Missing images should stay `null`; the page has a readable unavailable state. A configured missing file fails release verification.

Put the résumé in `public/resume.pdf` and set `contact.resume` to `/resume.pdf`; alternatively use an HTTPS URL. The navigation and contact links appear automatically. Check the PDF before release. Keep it `null` while unavailable.

## Code and sample output

Code/output objects contain `caption` and `content`. Use `\n` within a JSON string for line breaks, or let your editor handle JSON escaping. Preserve the actual text and credit its source in the caption. Content is displayed as escaped text, not executed. `null` omits the block.

## Charts

A chart record has a unique `id`, title, `type` (`bar` or `line`), caption, unit, source, `illustrative`, and a `series` of unique labels/finite numeric values. Bar values must be nonnegative; line charts need at least two points. State units/currency precisely.

Set `illustrative: true` for fictional examples created solely to show a presentation format; caption and source must disclose that. The CSV chart is `false`: its values are verified calculations from a synthetic dataset, not invented presentation values. It still requires synthetic-data disclosure.

Update chart values, the corresponding report excerpt and result text together. The figure and its accessible data table use the same series. Do not invent unsupported results to fill empty space.

## Verify and review

```bash
npm run build
npm run verify:content-edit
npm run test:browser
npm run verify:release
npm run dev
```

Open the printed `/Portfolio/` URL, check phone width, use Tab/Enter, try both themes and Less motion, and inspect each project's evidence. Review changes before requesting release approval. Editing/pushing source does not itself authorize a deployment.
