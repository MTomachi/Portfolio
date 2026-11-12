# Release status — live approved draft

Verified November 10, 2026. David approved publishing this reviewed draft on November 9. All five revised development phases are complete for that approved scope.

**Live website:** [David Maxwell's portfolio](https://mtomachi.github.io/Portfolio/).

## Release record

- Repository: [MTomachi/Portfolio](https://github.com/MTomachi/Portfolio), branch `main`.
- Application source first uploaded in [`969d0f0`](https://github.com/MTomachi/Portfolio/commit/969d0f070b37e3e3c4e67b8b6b7aae3dda8d6758).
- Deployed source revision: [`fea59b9`](https://github.com/MTomachi/Portfolio/commit/fea59b96e0e24f5dceb936ee5d57e4da69e12f4e). That revision added release documentation; application code/assets match the reviewed candidate.
- [Publishing run 42863579059](https://github.com/MTomachi/Portfolio/actions/runs/42863579059): build and deploy jobs both succeeded. Deployment logs returned the live URL above.
- Publishing remains manual, on `main`, with `release_approved` defaulting to false. A later source push does not deploy another release.

## Checks passed

The publishing run checked the actual `/Portfolio/` prefix: zero Astro errors/warnings/hints, 16 content tests, 30 Chromium browser tests, five static pages/100 local references, a fourth-record generation check, and rejection of duplicate slugs.

Public checks then confirmed HTTP 200 and direct navigation/refresh for:

- [Home](https://mtomachi.github.io/Portfolio/).
- [To-do List Application](https://mtomachi.github.io/Portfolio/projects/todo-list/).
- [Music listening dashboard](https://mtomachi.github.io/Portfolio/projects/music-listening-dashboard/).
- [CSV business report](https://mtomachi.github.io/Portfolio/projects/csv-business-report/).

Stylesheets, favicon and original screenshot returned HTTP 200 with the expected content types. Keyboard skip navigation, theme/motion controls and persistence, OS reduced motion, 390px layouts, and readable home/detail content without JavaScript passed against the public site. No browser or network errors occurred in those checks. The screenshot also loaded at phone width. Live desktop/light and phone-width/dark captures were visually inspected.

Local verification evidence is in ignored `artifacts/public-verification.json`, `public-desktop-light.png` and `public-mobile-dark.png`. These are automated Brave/Chromium checks; physical phones, Safari, Firefox and screen readers have not been tested. No performance score or timed employer usability study is claimed.

## Content and next release

The site intentionally identifies draft case studies, the unfinished music project with lost original files, and generated CSV data/in-progress work. The résumé remains absent until David supplies it. These limits were included in the approved draft.

Edit `src/data/portfolio.json` using [EDITING.md](EDITING.md). Follow [DEPLOYMENT.md](DEPLOYMENT.md) for checks, separate approval of a future release, manual publishing and rollback. No domain or paid service has been purchased.

## Earlier publishing interruption

The [first checks run](https://github.com/MTomachi/Portfolio/actions/runs/42673917267) failed before any job started with GitHub's internal server error. GitHub reported an Actions incident at the time; its retry API refused that run. A [subsequent checks run](https://github.com/MTomachi/Portfolio/actions/runs/42674724783) passed, followed by the successful manual publishing run above. The earlier browser “page not found” report did not prevent the confirmed deployment; its exact URL/cause was not established.
