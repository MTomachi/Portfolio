# Release review — approved and published draft

Prepared and explicitly approved by David on November 9, 2026. **Draft published and verified November 10, 2026.** Repository: [MTomachi/Portfolio](https://github.com/MTomachi/Portfolio), branch `main`. [Live website](https://mtomachi.github.io/Portfolio/); [successful publishing run](https://github.com/MTomachi/Portfolio/actions/runs/42863579059).

## What is ready

- Name/background, three direct project links, evidence-linked skills, About and contact in the approved order.
- Three eight-section case studies. Real to-do screenshot with full-size access; verified CSV report/code/chart/table; honest unfinished music project with no substituted demonstration.
- Light/dark/system themes, Less motion, phone layouts, keyboard navigation and JavaScript-off content.
- One-file content editing, generated routes, validation, checks-only CI and a gated manual Pages workflow.
- [Editing guide](EDITING.md), [deployment/rollback guide](DEPLOYMENT.md), [sources](CONTENT_SOURCES.md), [build record](BUILD_LOG.md).

## Checks passed locally

| Check | Result |
|---|---|
| Astro/TypeScript | Zero errors, warnings or hints. |
| Content tests | 16 passed. |
| Browser tests | 30 passed under `/Portfolio/`; root-path variant also passed 30 during preparation. |
| Static references | Five generated pages and 100 local links/anchors/assets valid under `/Portfolio/`. |
| Content editing | Adding a fourth record generated both entry and page; a duplicate slug stopped the actual build. Original data unchanged. |
| Workflow inspection | YAML parsed, immutable action SHAs, publishing limited to main/manual approval input default false. |
| Visual review | Desktop light/dark and narrow-phone layouts captured in `docs/previews/`. |

Browser checks cover project evidence/navigation, real screenshot loading, chart geometry/data correspondence, 320/390/768/1440px layouts, 200% text in a short viewport, keyboard focus, themes, system reduced motion, blocked/invalid storage, JavaScript off, blocked images, 404 navigation and browser errors/resources.

Local browser was Brave on Fedora. The publishing run also passed 16 content tests, 30 Chromium browser tests, content-edit checks and 100 local references at `/Portfolio/`. Public routes/refresh, assets, preferences, keyboard navigation, reduced motion, phone-width layouts and JavaScript-off content passed live Brave checks. Physical phones, screen readers, Safari and Firefox have not been validated. No performance score is claimed; the complete static output is about 377 KiB before compression, not a measured page-transfer size.

## Content limits included in this candidate

- To-do completion, current runtime and cross-platform packaging are unconfirmed. Its page identifies source-reviewed capabilities and an existing screenshot.
- Music was unfinished; its original code/data were lost. This candidate is not a rebuilt dashboard.
- CSV uses generated data. Its verified sample totals do not claim business impact. The script remains in progress and documents its missing-column validation defect.
- No résumé PDF yet; no résumé download link. No unavailable GitHub/demo destinations are rendered as buttons.
- Case studies remain marked as drafts for owner review. Approval may authorize publishing this clearly marked draft; it does not assert that unfinished underlying projects are complete.

## Review locally

```bash
cd /home/david/Projects/portfolio
npm run dev
```

Open the printed `/Portfolio/` URL. Inspect the homepage, all three case studies and contact details, then stop with Ctrl+C. Screenshots provide a static visual review; the running site is needed to check interactions.

## Completed release and future changes

David explicitly approved this reviewed draft. The manual publishing run deployed `fea59b9` successfully, with the same application code/assets first uploaded in `969d0f0`. The returned public URL and all three project routes were verified; [release status](RELEASE_STATUS.md) records the evidence and earlier GitHub interruption. Phase 5 is complete for this approved draft.

For future changes, edit locally, repeat checks, obtain approval of the next release, then submit the manual publishing workflow and verify the resulting public URLs. Domain purchases and paid services remain unauthorized.
