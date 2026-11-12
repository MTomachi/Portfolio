# David Maxwell — portfolio

An approved draft portfolio for a Mount Royal University student moving from Computer Science toward Data Science. Built with Astro, TypeScript, plain CSS and a small preferences script. Core content works without JavaScript.

**Repository:** https://github.com/MTomachi/Portfolio

**Live website:** https://mtomachi.github.io/Portfolio/ — verified November 10, 2026; see [release status](docs/RELEASE_STATUS.md).

**Release gate:** David approved this reviewed draft on November 9, 2026. Its build, deployment and public checks passed. Future releases still need approval. The deployment workflow remains manual-only and defaults to approval=false.

## Run

Use Node 24 and npm. Dependencies are already installed on David's laptop; use `npm ci` on a fresh checkout.

```bash
cd /home/david/Projects/portfolio
npm run dev
```

Open the printed URL ending in `/Portfolio/`. Stop the server with Ctrl+C.

## Check

```bash
npm run build
npm run verify:content-edit
npm run test:browser
npm run verify:release
```

Build includes Astro/TypeScript checks and content validation tests. Browser checks use Brave on this laptop. Elsewhere, install a Playwright browser with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to a compatible executable. GitHub Actions installs its own Chromium. The publishing run passed zero Astro diagnostics, 16 content tests, 30 browser tests, content-edit checks and 100 local references. Live routes, assets, preferences, keyboard access and JavaScript-off content were also checked.

`verify:release` checks generated pages, local links, anchors and assets. It reports draft content and does not publish anything. `verify:content-edit` uses an isolated temporary copy to prove a fourth project creates a homepage entry and detail page, and duplicate slugs fail the actual build.

## Content and current limits

Edit `src/data/portfolio.json`; it supplies profile/contact, evidence-linked skills, projects, case studies, excerpts and charts. See [editing instructions](docs/EDITING.md).

- **To-do application:** source-backed C++17/Qt/CMake features and the real README screenshot; current completion/runtime remain unconfirmed.
- **Music dashboard:** unfinished; the original code and generated dataset were lost. No reconstructed dashboard, invented chart or working-demo claim.
- **CSV report:** working Python/pandas sample calculations with generated data; stays in progress and documents its validation limitation.
- Résumé not supplied; its link is omitted. No fictional contact details or dead demo buttons.

## Release and reference documents

- [Release review and known limits](docs/RELEASE_REVIEW.md)
- [GitHub Pages setup, release and rollback](docs/DEPLOYMENT.md)
- [Evidence and content sources](docs/CONTENT_SOURCES.md)
- [Build log](docs/BUILD_LOG.md)
- [Approved employer-focused plan](docs/APPROVED_MVP.md)

Ryan Fitzgerald's [Dev Portfolio](https://github.com/RyanFitzgerald/devportfolio/tree/852d650fb0a8cf0c98f874af5a56a0a9b7d7d4b7) informed the static structure; [Denoax's portfolio](https://github.com/Denoax/portfolio/tree/72a3c7a2a75913de64d8baf1591282acd19d181c) informed the initial experience research. Website code and styling are original. The only project screenshot is from David's own to-do repository. No target/template code, personal assets, fonts or sounds were copied.
