# Revised MVP — Phase 1 content preparation

**Historical review:** later on November 9 the user confirmed that the unfinished music code/data were lost and that CSV data is generated. The user also supplied `MTomachi/Portfolio` and authorized subsequent phases. Current evidence and implementation status are in [CONTENT_SOURCES.md](CONTENT_SOURCES.md) and [BUILD_LOG.md](BUILD_LOG.md); the initial findings below are preserved as a point-in-time review.

Reviewed November 9, 2026. The approved five-phase plan is [APPROVED_MVP.md](APPROVED_MVP.md). This report completes the evidence review and prepares draft content; it does not mark missing projects or evidence as verified. Phase 2 has not begun under the revised plan.

## Existing work and boundaries

`/home/david/Projects/portfolio` already contains a local Astro/TypeScript site, central content file, three detail routes, original interface illustrations, theme/motion controls, tests and prepared deployment files from the earlier plan. It is not a Git checkout. None of this is a public release.

The revised homepage needs a direct name/role introduction and a Technical Skills section. Detail pages need the approved eight-section structure. Existing illustration previews are not real project screenshots. The old CSV template also shows a generic “Results are pending” box whenever an in-progress project has no charts; later presentation work must replace that condition so it does not contradict the now-verified sample report results. These are later-phase tasks, not changes made in Phase 1.

Only local content, evidence and documentation were updated. No repository was created, no remote files/settings were changed, and nothing was published. Repository creation, publication, domain purchases and paid services require separate approval.

## Evidence inventory

| Project | Verified | Evidence still missing |
|---|---|---|
| To-do List Application | Actual source and build file; C++17, Qt Widgets, CMake; task operations and JSON persistence implemented in source; real screenshot linked from its README, downloaded and inspected. | Current runtime test, completion status, release packaging and the author's actual development challenges. |
| Music Listening Dashboard | User identifies the project and confirms synthetic data. Its public repository exists. | Repository is empty; no attributable local source, dataset, screenshots, stack or analysis results found in the bounded search. |
| CSV Business Report | Local Python/pandas implementation, input CSV, cleaned output and text report. Isolated execution reproduced the saved report; independent arithmetic confirmed its numbers. | Dataset origin/publication permission, public repository, README, dependency manifest and project test suite. Keep **In progress**. |

The connected GitHub account is `MTomachi`. Its accessible owned repositories are [profile](https://github.com/MTomachi/MTomachi), [todo-qt](https://github.com/MTomachi/todo-qt), and [music-listening-dashboard](https://github.com/MTomachi/music-listening-dashboard). No CSV or portfolio repository appeared. The music contents endpoint returned “This repository is empty.” No unrelated repository was repurposed.

Local inspection covered relevant names in the home directory and Projects, Documents, Desktop, Downloads and Pictures. This was a bounded search, not proof that no other copy exists. Unrelated coursework, including `assign2.py`, was not treated as portfolio evidence or modified.

## Professional copy prepared

**Name:** David Maxwell

**Role:** Mount Royal University student — software development and data analysis

**Introduction:** I’m David Maxwell, a Mount Royal University student moving from Computer Science toward Data Science. I’m learning Python and building projects in desktop applications and data analysis.

**Interests and direction:** Software development, data visualization and practical reporting; seeking internship, co-op and junior data opportunities. These describe the user's stated interests and audience, not professional experience or confirmed Data Science enrollment.

**About:** I have completed one year of Computer Science and am learning Python. My work includes a C++/Qt to-do application and an in-progress Python/pandas CSV report. I am also documenting a music dashboard that uses synthetic data.

**Contact:** [GitHub](https://github.com/MTomachi), `davidmax962@gmail.com`. The email is published in the [profile README](https://github.com/MTomachi/MTomachi/blob/b4004b0a010c0cb77f689362dea07246fa5fd428/README.md). The résumé remains pending; omit its download link until the PDF is supplied.

### Demonstrable skills inventory

List uses of tools and techniques; avoid proficiency ratings.

| Category | Prepared wording | Evidence |
|---|---|---|
| Programming | C++17; Python, currently learning | [To-do build file](https://github.com/MTomachi/todo-qt/blob/e764cf1251dbf5858360abad1cab828401fa0c96/CMakeLists.txt); `/home/david/csv-business-report/main.py`; user coursework statement. |
| Frameworks and libraries | Qt Widgets; pandas | To-do source and build configuration; CSV script imports and isolated execution. |
| Development tools | CMake; pathlib for file paths | Build configuration; CSV script. `pathlib` is Python's standard library, not a separate framework. |
| Data handling | JSON task storage; CSV cleaning, validation and grouped summaries | To-do `saveTasks`/`loadTasks`; CSV script lines 13–63. |
| Reporting | Per-row revenue, total units/revenue and revenue by product; text/CSV output | CSV script lines 57–82 and verified report. |

Do not add machine learning, NumPy, SQL proficiency, Git proficiency, or Astro/TypeScript proficiency without evidence. Tools used to construct this portfolio do not establish the owner's proficiency. The profile says “currently learning Python/SQL”; only Python coursework and Python project usage are independently supported here, so SQL stays out of the demonstrated-skills list.

## Project copy and eight-section evidence map

### 1. To-do List Application

**Homepage description:** A C++17 desktop application built with Qt Widgets and CMake. Its source implements adding, completing and deleting tasks, with local JSON storage between sessions.

| Section | Prepared content |
|---|---|
| Overview | A small desktop task manager with a text input, checkable task list, Add button and Delete Selected button. |
| Problem | The README describes practicing C++ with a minimal interface and immediate completion feedback. Do not invent a client or productivity improvement. |
| Technologies | C++17, Qt Widgets, CMake. CMake tries Qt 6 then Qt 5; the actual screenshot build version is unknown. |
| Implementation | Qt signals connect Add/Enter, Delete and checkbox changes to task methods. Tasks serialize text/completion into JSON in the application's data directory and load on startup. These are source observations, not a claim about why the author chose them. |
| Demonstration | Real README screenshot, saved locally as `docs/evidence/todo-readme-original.png`. Suggested alt text: “To-do List desktop window with a checked task, an Add button and a Delete Selected button.” It is an existing screenshot, not a new runtime test. |
| Results | Source-backed task creation, completion strikethrough, deletion and persistence. No measured user impact, performance figures or cross-platform pass is claimed. |
| Challenges and Improvements | Actual development difficulties have not been supplied. Proposed future checks: run the app, verify saving/loading, document setup and confirm completion status. Do not describe these as problems already solved. |
| Source Code | [MTomachi/todo-qt](https://github.com/MTomachi/todo-qt). Reviewed `e764cf1251dbf5858360abad1cab828401fa0c96`: README, CMakeLists.txt, main.cpp, mainwindow.cpp, mainwindow.h and complete tree. |

### 2. Music Listening Dashboard

**Homepage description:** A music-listening dashboard project using synthetic data. Its implementation and findings are not yet verified; the example chart is illustrative only.

| Section | Prepared content |
|---|---|
| Overview | User-described music dashboard with generated/synthetic data. |
| Problem | The original analysis question has not been supplied. “Exploring listening patterns” is a topic, not a verified analysis result. |
| Technologies | Unconfirmed; do not infer Python, pandas, Streamlit or chart libraries from the name. |
| Implementation | Pending source/dataset review. |
| Demonstration | No verified dashboard screenshot or working demo. Existing portfolio illustrations/chart are examples and must remain labeled separately from project evidence. |
| Results | No verified findings. Fictional chart values are not dashboard results or real listening history. |
| Challenges and Improvements | Actual challenges unconfirmed. Next content step: locate the implementation and synthetic dataset, then document its methods and limitations. |
| Source Code | [Repository exists](https://github.com/MTomachi/music-listening-dashboard) but is empty. Keep the website's Source Code link omitted while no source is available. |

### 3. CSV Business Report — In progress

**Homepage description:** An in-progress Python/pandas script that cleans CSV sales records and produces a cleaned dataset and product-revenue report. Results are verified against the included input file; its data origin remains unconfirmed.

| Section | Prepared content |
|---|---|
| Overview | Turn the included CSV sales records into a cleaned table and readable report. |
| Problem | Manual CSV rows need consistent fields and a summary. The original business context has not been provided; do not invent a company or client. |
| Technologies | Python, pandas, standard-library pathlib. Existing local environment ran Python 3.14.8 and pandas 3.0.6; these are observed versions, not a tested minimum support range. |
| Implementation | Normalize headers/product text, remove exact duplicates, convert date/numeric fields, reject missing/unparseable dates, quantities or prices, nonpositive quantities and negative prices, calculate row sales and grouped totals, write cleaned CSV and UTF-8 report. Missing product/order ID values do not receive equivalent validation. |
| Demonstration | Real local outputs: `/home/david/csv-business-report/output/report.txt` and `cleaned_sales.csv`. These can become a readable sample-output block in Phase 3 after data publication permission is confirmed. No screenshot was invented. |
| Results | The included 10-row file yields **$4,005.00 revenue, 24 units, zero duplicates removed**. Product revenue: Laptop $3,000.00; Monitor $540.00; Mouse $240.00; Keyboard $225.00. The original report uses `$`; no CAD/USD currency assumption is made. These are dataset calculations, not business impact. |
| Challenges and Improvements | Verified issue: required-column checking happens after column access. Missing `unit_price` raises KeyError before the intended error message. Proposed future improvement: reorder validation and add malformed-input tests; not implemented in this portfolio task. |
| Source Code | Local `/home/david/csv-business-report/main.py`. No matching public repository found; omit a GitHub button until one exists. Do not publish its code/data without separate approval. |

## Verification performed

- Fetched the current GitHub repository list and to-do default-branch revision; read the complete listed to-do source and README. Source review passed; no to-do runtime pass is claimed.
- Downloaded the README's PNG attachment and inspected its actual appearance. SHA-256: `1f1f9b77eea0e800547284f6aee0177b692baff3a5443b7792c4062d9217d992`. [Original attachment](https://github.com/user-attachments/assets/c1b809c8-a1f6-4a21-bef5-562abca89341). It remains a local review asset.
- Independently recomputed the CSV totals using Python's csv and Decimal modules; all totals match the saved report.
- Ran the existing CSV script/interpreter against a temporary copy of the input. Exit 0; saved report reproduced exactly; every cleaned row's total equals quantity × price.
- Ran one isolated missing-column check; confirmed the KeyError limitation. It is an identified defect, not a test pass for robust error handling.
- Compared SHA-256 hashes before/after: original CSV source, input and saved outputs were unchanged. No packages installed.
- Website validation results for the prepared content are recorded in the revised Phase 1 entry in `BUILD_LOG.md`.

## Remaining input

1. Music source/dataset location or repository URL, real screenshot/output, tools and results.
2. CSV dataset origin and permission to display sample inputs/outputs publicly.
3. To-do completion status and any real development challenges worth explaining.
4. Résumé PDF when available.

Unanswered items remain explicitly unconfirmed. The next phase may reuse the existing Astro foundation while aligning content fields, homepage order and routes with the revised plan; no fresh framework or extra major dependency is needed.
