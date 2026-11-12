# GitHub Pages release procedure

## Current configuration

Repository: [MTomachi/Portfolio](https://github.com/MTomachi/Portfolio), branch `main`. Astro uses `site: https://mtomachi.github.io` and `base: /Portfolio`. The repository name's capital P matters. Intended public URL: `https://mtomachi.github.io/Portfolio/`.

Environment variables `SITE_URL` and `BASE_PATH` override these defaults for checks or a later domain. Page/asset links use a single helper, so content paths never contain the repository prefix.

The local checkout is connected to this repository. The approved draft source was uploaded in commit `969d0f070b37e3e3c4e67b8b6b7aae3dda8d6758`; revision `fea59b96e0e24f5dceb936ee5d57e4da69e12f4e` deployed successfully on November 10, 2026. The public URL and all project routes were verified; see [RELEASE_STATUS.md](RELEASE_STATUS.md). The connected GitHub tools can inspect runs but cannot administer Pages settings or dispatch a workflow, so the owner submits the manual publishing form.

## Publish an approved release

1. Review the local site and [release review](RELEASE_REVIEW.md).
2. Run the required checks and obtain David's explicit approval of that release.
3. Upload/push the reviewed source to `main`. Do not upload `node_modules`, `.astro`, `dist`, test output, `.env` files or `artifacts`.
4. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Merely preparing a workflow or CNAME file does not configure Pages.
5. Open repository **Actions → Publish portfolio to GitHub Pages → Run workflow** on `main`. Set `release_approved` true only for the approved release.
6. Confirm the build checks pass and the `github-pages` deployment succeeds. Use the URL from the completed deployment, rather than assuming publication succeeded.

There is deliberately no automatic deployment on push. `pages.yml` requires an explicit manual input (default false), runs checks before uploading `dist`, and restricts deployment to main. The build job has read permissions; the deploy job receives `pages: write` and `id-token: write`. A repository owner may additionally protect the `github-pages` environment with required reviewers in GitHub settings.

`checks.yml` runs validation on main pushes, pull requests and manual requests. It has no publishing permission. All workflow actions are pinned to reviewed commit SHAs.

## Required checks

```bash
npm run build
npm run verify:content-edit
npm run test:browser
npm run verify:release
```

The deployment workflow reads Pages metadata and uses its origin/base path for the same build and browser checks. The runner installs Chromium; local verification used Brave on Fedora. The first approved release passed remote CI and public browser checks on November 10, 2026. Repeat the required checks for each later release; the earlier pass does not validate future changes.

After deployment, open the home and all three detail URLs directly, refresh them, check the screenshot/full-size link, navigate by keyboard, try theme/motion settings, and check on a phone. A valid local build does not prove the remote site is live.

## Recover from a bad release

Keep the last known-good source revision. Revert the faulty source change locally or with a GitHub revert commit, rerun checks, obtain approval for the corrected release, and run the manual deployment again. Updating/reverting source alone does not redeploy. To remove the site entirely, use repository Settings → Pages → Unpublish site; this is a separate owner action.

## Optional custom domain — later

No domain or paid service has been purchased. After David supplies an owned domain and approves attaching it:

1. Follow GitHub's domain verification and DNS instructions; use the exact domain, not an invented one.
2. Set the domain in repository Pages settings and enable HTTPS when GitHub makes it available.
3. Let the workflow read the new Pages metadata; update local default `site`/`base` to match (normally `/` at a domain root).
4. Repeat all checks and approve the new release before deployment. Confirm direct project links, assets and HTTPS at the actual public URL.

Sources: [Astro Pages guide](https://docs.astro.build/en/guides/deploy/github/), [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).
