# Build log

## Current authorization — revised MVP, November 9, 2026

Release update: David explicitly approved publishing the reviewed draft on November 9. Source upload and deployment of that candidate are authorized; deployment success remains to be verified. The connector can upload files and read runs but cannot administer Pages or dispatch its first workflow. Domain purchases and paid services remain unapproved.

The user approved `docs/APPROVED_MVP.md`, reviewed Phase 1, then supplied `MTomachi/Portfolio` and authorized the remaining development phases. Required checks AND separate release approval are mandatory before deployment. Domain purchases and paid services remain unapproved. The reviewed source has now been uploaded after release approval; no successful website deployment is claimed. See RELEASE_STATUS.md.

## Revised Phase 1 — Content preparation

Prepared accurate professional copy and an evidence-linked skills inventory in `docs/PHASE_1_CONTENT.md`; updated existing `portfolio.json` descriptions and CSV facts without changing the application architecture. Rechecked GitHub, read the complete to-do implementation/build files, inspected the real README screenshot, and located the local CSV source/data/outputs. Kept music implementation unverified, to-do completion unconfirmed, CSV in progress, and résumé pending.

CSV verification: independent Decimal arithmetic and an isolated execution reproduced the existing 10-row report ($4,005.00, 24 units, zero duplicates). All cleaned row totals matched. An isolated missing-price-column case confirmed a KeyError before the friendly validation check. Original project hashes were unchanged; no install or source modification was needed. Full evidence and remaining inputs are in the content report.

Website content verification: `npm run build` passed with zero Astro diagnostics and 11 content tests; `npm run test:browser` passed all 22 checks in headless Brave. `npm run verify:release` validated five generated pages and 75 local links/assets at `/`. Its inherited “PUBLIC DRAFT” text is a content-readiness label, not evidence of publication; this website remains local and unpublished. No Phase 2 implementation has started under this revised plan.

## Revised Phase 2 — Website foundation

The user supplied the public `MTomachi/Portfolio` repository and authorized the remaining development phases. Verified its `main` branch and README; linked the local Git checkout to that origin without pushing. Astro now defaults to `https://mtomachi.github.io` with case-sensitive `/Portfolio/` base. A manual-only deployment workflow defaults its release approval input to false; no deployment was triggered.

Homepage order now matches the revised plan: David's name/background, featured projects, evidence-linked technical skills, About, contact. Skills share the central data file and validate project references. The résumé link remains omitted until supplied. Latest user facts are recorded: music unfinished and original files lost; CSV generated data for a reusable business-cleaning script.

Verification: zero Astro diagnostics, 14 content tests, 23 browser checks. Static link check passed for five pages and 91 local references under `/Portfolio/`. A broken canonical path on the generated 404 page was removed and that page marked noindex; validation then passed. No public URL or remote Actions pass is claimed.

Check: `npm run dev`, open the printed URL ending `/Portfolio/`, and browse Technical Skills/project links. Next: the eight-part project presentations and real evidence.

## Revised Phase 3 — Project presentations

Implemented all eight case-study sections and their anchor navigation. The to-do page uses the verified original README screenshot. CSV includes its actual saved report, the four-line source excerpt, verified generated-data product-revenue chart and accessible data table. Music is labeled unfinished with original code/data lost; the old fictional dashboard illustration/chart has been removed. Missing code/demo destinations remain omitted.

Verification: zero Astro diagnostics, 16 content tests, 26 browser checks and five generated pages with 99 valid local references. The chart test checks actual rendered bar proportions against the data table, without JavaScript. Verified screenshot loading, eight-anchor/next/back navigation, synthetic-data disclosures, lost-evidence state and 320px detail layouts. Corrected preformatted content validation to preserve real excerpt whitespace.

Check: open each case study, jump to Demonstration, inspect CSV code/results and expand its table. Next: final design, accessibility and browser failure checks.

## Revised Phase 4 — Design and testing

Retained the original minimal typography, light/dark palettes and normal scrolling; replaced fictional interface art with actual evidence or an honest unavailable state. Enlarged preference-control hit areas, strengthened the theme-control boundary, and added a full-size screenshot link. Theme persistence, device reduced motion and no-JavaScript defaults remain intact.

Verification: zero Astro diagnostics, 16 content tests and all 30 browser checks passed in local Brave. Coverage includes 1440/768/390/320px layouts, 200% text in a short viewport, both themes, visible keyboard focus, storage denial, JavaScript disabled, image failure, no browser errors/missing local resources, 404 navigation and metadata, chart geometry/table values and case-study navigation. Main normal-text color combinations pass 4.5:1 contrast. Visually inspected current desktop light and mobile dark case-study captures. This is not a screen-reader audit or a Safari/Firefox pass.

Check: run `npm run build && npm run test:browser`; inspect `docs/previews/`. Next: release preparation and updating instructions. Public deployment remains gated on the user's release approval.

## Revised Phase 5 — Release preparation; deployment pending approval

Completed local GitHub Pages configuration, root-path override checks, editing/deployment/rollback instructions, release review and workflow guard inspection. Rechecked a fourth-project edit in an isolated copy; duplicate slugs failed with a clear content error. Fixed the readiness report so a missing résumé is informational, consistent with the revised MVP. No dependencies were added.

Final prefix verification: zero diagnostics, 16 content tests, 30 browser checks, five pages and 100 valid local references. The root-path variant also passed its build, 30 browser checks and 100 local references. Workflow YAML parsed and its default-false manual approval guard passed inspection. `docs/RELEASE_REVIEW.md` records exact limits and handoff instructions. Release archives are generated locally in ignored `artifacts/` for review; they are not deployed.

Pending: explicit owner release approval, source upload, remote Pages source selection/workflow execution, and public URL verification. Remote CI/browser/Pages success is not claimed. The original CSV source/data/outputs were not changed. No paid services or domain purchase were used.

## Approved source upload — November 9, 2026

Uploaded all 46 reviewed source files atomically to main in `969d0f070b37e3e3c4e67b8b6b7aae3dda8d6758`, preserving the repository's initial commit. Uploaded blob hashes match the local files. No application code changed from the reviewed candidate; only approval/status documentation was updated.

The automatic Check portfolio run `42673917267` failed before any jobs started. Its annotation reports an internal server error (correlation f9581592-4c7e-4a30-9d49-60192e64907e); GitHub refused the failed-job retry with HTTP 403. The owner reported starting the publishing workflow, but no workflow_dispatch run was visible in subsequent API reads. GitHub's live summary API reported a major Actions outage and an investigating Actions and Checks API incident. This is an external service blocker, not a reported application-test failure. Current progress and resumption instructions are in RELEASE_STATUS.md.

## Revised Phase 5 — Published and verified, November 10, 2026

The owner submitted manual publishing run `42863579059` for deployed source `fea59b96e0e24f5dceb936ee5d57e4da69e12f4e`. Both build and deploy succeeded. The actual Pages prefix was `/Portfolio/`. Remote verification passed zero Astro diagnostics, all 16 content tests, all 30 Chromium browser tests, fourth-record/duplicate-slug checks, and five pages/100 local references. Deployment returned `https://mtomachi.github.io/Portfolio/`.

Live Brave checks passed direct home/all three case-study URLs and refresh, canonicals, CSS/favicon/screenshot responses, screenshot/full-size access, keyboard skip/theme/motion controls, preference persistence, OS reduced motion, 390px layouts and all routes without JavaScript. No browser/network errors occurred. Captured and visually inspected the live desktop/light and phone-width/dark homepage; confirmed its lazy-loaded screenshot appears when scrolled into view. Evidence is in ignored `artifacts/public-verification.json` and public captures. Physical phones, Safari, Firefox, screen readers and timed employer comprehension remain untested.

Updated the release, deployment and editing handoff references. All five phases are complete for the approved, clearly marked draft. The résumé and owner content improvements can follow in a separately reviewed release; music remains unfinished and CSV remains in progress with generated data. No paid services or domain purchase were used. Website code/assets were unchanged during publishing verification.

Check: open the live URL, use View project, refresh a case study, change Theme and enable Less motion. Follow README/EDITING.md for local changes and DEPLOYMENT.md for checks, future release approval, manual publishing and rollback.

## Historical work under the earlier plan

## Authorization

- Plan approved November 3, 2026.
- November 4: user requested continuation of all authorized work.
- Source: `/home/david/portfolio-research-plan.md`.

## Current content prerequisites

- Public name David Maxwell confirmed by the user on November 4; résumé will be supplied later.
- Public email and GitHub link verified in the user's public profile README.
- To-do stack/features verified from the user's project source; completion status remains unconfirmed.
- Music repository is empty; no tools/results inferred. Synthetic-data disclosure required by the user.
- CSV report remains in progress.

## Deployment prerequisite

The GitHub connector supports repository contents but cannot create a repository or enable Pages. No authenticated local GitHub CLI or token is available. Deployment files will be completed and checked locally before handoff; no existing unrelated repository will be repurposed.

## Phase 0 — Content

Completed: one central file, confirmed public name/contact, verified to-do facts, explicit draft/status/provenance labels. The résumé remains pending at the user's request. No music/CSV results or tools were invented.

Check: review `src/data/portfolio.json` and `docs/CONTENT_SOURCES.md`.

## Phase 1 — Foundation

Completed: Astro 7 static setup, TypeScript checks, data validator, home, three generated case-study routes, 404, base-path helper, semantic navigation, and JavaScript-off content.

Verification: `npm run build` passed with zero Astro diagnostics and 11 content tests. `npm run test:browser` passed the JavaScript-off home/all-project-pages check in real headless Brave. Playwright uses Astro's documented `--ignore-lock` foreground mode to avoid auto-backgrounding in an agent session.

Run: `npm run dev`; open its Local URL. Next: the project reel and responsive previews.

## Phase 2 — Reel

Completed: original split-layout project rows, native index links, visible project/source links, responsive interface illustrations with clear disclaimers, About and contact composition. No scroll interception or hover-only actions.

Verification: 11 content tests, zero Astro diagnostics, and 7 browser tests passed. Checked 1440, 768, 390 and 320px widths, keyboard skip/open flow, JavaScript off, and short viewport with 200% text. A tablet overflow caused by the preview aspect ratio was fixed with an explicit bounded width and the affected checks passed again.

Check: `npm run dev`, browse the project index, and use Tab/Enter to open a project. Next: structured case studies and static chart/table figures.

## Phase 3 — Case studies

Completed: three structured case studies with section links, facts, limitations, next steps, next-project navigation, and explicit source/availability states. The music page discloses synthetic data and an illustrative chart; CSV results remain pending. Static SVG charts include exact-value HTML tables, captions, units and sources.

Verification on November 9: `npm run build` passed with zero Astro diagnostics and 11 content tests. All 11 browser tests passed in Brave, including chart/table correspondence without JavaScript, real anchor/next/back navigation, missing destinations and 320px detail layouts.

Check: run `npm run dev`, open a project directly, and expand “View chart data” on the music page. Next: themes, Less motion, and the short decorative opening.

## Phase 4 — Preferences and opening

Completed: System/Light/Dark selector, native Less motion control, bounded preference storage with in-memory fallback, pre-paint preference initialization, device preference change handling, and a non-blocking 500ms text fade. Operating-system reduced motion always suppresses the fade; unavailable scripting hides the controls while CSS follows device preferences.

Verification: zero Astro diagnostics, 11 content tests and all 20 browser tests passed. Tests cover navigation/reload persistence, device preference changes, denied storage access/writes, malformed/oversized saved state, and JavaScript-off content. Visually inspected desktop dark and narrow-phone music case-study captures. Measured body/muted/accent token combinations against their backgrounds: minimum 5.25:1 light and 7.04:1 dark. This is focused contrast checking, not a complete accessibility audit or screen-reader review.

Check: change Theme, reload, and enable Less motion; repeat with the device’s reduced-motion preference. Next: deployment workflow, prefix/asset checks and handoff documentation. Public publication still needs a portfolio repository with Pages enabled.
