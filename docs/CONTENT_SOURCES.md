# Content sources

Current review: November 9, 2026. This document supersedes earlier missing-content assumptions in the historical Phase 1 report.

## User-confirmed facts

The conversation supplies David Maxwell's public name; Mount Royal University; one year of Computer Science; moving toward Data Science; current Python coursework; interest in internship/co-op/junior data opportunities; and the three project identities. No confirmed Data Science enrollment, professional experience or proficiency rating is inferred.

Latest clarifications:

- Music dashboard was **unfinished**. Its original code and generated dataset were lost in a previous setup. No reconstruction is part of this portfolio MVP.
- CSV sales records are **generated data**. The intended project is a reusable script for cleaning business data. The script remains **in progress**.
- Résumé will be supplied later. Its link is omitted.

## Public profile and repositories

- [Profile README](https://github.com/MTomachi/MTomachi/blob/b4004b0a010c0cb77f689362dea07246fa5fd428/README.md): GitHub handle and published email `davidmax962@gmail.com`. Other profile claims, such as client work or SQL proficiency, were not adopted without supporting evidence.
- [Portfolio repository](https://github.com/MTomachi/Portfolio): supplied by the user and verified to exist with `main` and a README. Local Git points to that origin. No source push, Pages configuration change or deployment has been performed by this work.
- [Music repository](https://github.com/MTomachi/music-listening-dashboard): empty when checked. No source/demo link is presented as if it contains an implementation.

## To-do application

Reviewed revision [`e764cf1`](https://github.com/MTomachi/todo-qt/tree/e764cf1251dbf5858360abad1cab828401fa0c96), including the complete tree and these files:

- [README.md](https://github.com/MTomachi/todo-qt/blob/e764cf1251dbf5858360abad1cab828401fa0c96/README.md): stated purpose, features and original screenshot.
- [CMakeLists.txt](https://github.com/MTomachi/todo-qt/blob/e764cf1251dbf5858360abad1cab828401fa0c96/CMakeLists.txt): C++17, Qt Widgets, CMake; Qt 6/5 discovery.
- [mainwindow.cpp](https://github.com/MTomachi/todo-qt/blob/e764cf1251dbf5858360abad1cab828401fa0c96/src/mainwindow.cpp), [header](https://github.com/MTomachi/todo-qt/blob/e764cf1251dbf5858360abad1cab828401fa0c96/src/mainwindow.h), [main.cpp](https://github.com/MTomachi/todo-qt/blob/e764cf1251dbf5858360abad1cab828401fa0c96/src/main.cpp): Add/Enter, blank-entry handling, completion strikethrough, deletion, AppData JSON save/load.

These are source-backed capabilities. The desktop app was not run during this portfolio review; completion, packaging and cross-platform behavior remain unconfirmed. No time savings or usage statistics were invented.

Real screenshot: [original GitHub attachment](https://github.com/user-attachments/assets/c1b809c8-a1f6-4a21-bef5-562abca89341), visually inspected and retained unchanged as `public/images/todo-list.png` and the local review copy `docs/evidence/todo-readme-original.png`. SHA-256: `1f1f9b77eea0e800547284f6aee0177b692baff3a5443b7792c4062d9217d992`. It is the owner's project screenshot, not generated interface art or a new runtime capture.

## CSV business report

Local sources inspected:

- [main.py](/home/david/csv-business-report/main.py:1): Python/pandas/pathlib implementation.
- [sales.csv](/home/david/csv-business-report/data/sales.csv:1): ten generated records.
- [report.txt](/home/david/csv-business-report/output/report.txt:1): actual saved text report.
- [cleaned_sales.csv](/home/david/csv-business-report/output/cleaned_sales.csv:1): saved row-level calculations.

Verification used independent csv/Decimal arithmetic and the project's existing interpreter in an isolated temporary directory. Exit 0 reproduced the saved report exactly. All row revenue values equal quantity × unit price. Original source/input/output hashes remained unchanged; no dependencies were installed and no project source was modified.

Verified sample figures: revenue $4,005.00; 24 units; zero duplicates; product revenue Keyboard $225.00, Laptop $3,000.00, Monitor $540.00, Mouse $240.00. Currency is printed as `$` by the original script; no CAD/USD assumption is made. These are calculations for generated records, not real company activity or business impact.

The website report excerpt comes from `output/report.txt`. The four-line code excerpt comes from `main.py` lines 57–60, with inline comments omitted. The SVG chart/table uses the verified product totals. It is marked synthetic; `illustrative: false` distinguishes an actual verified sample calculation from invented presentation data.

Known limitation: required-column validation occurs after column access (main.py lines 16–27 versus 47–55). An isolated missing-unit_price input raised KeyError before the friendly error. This is documented as an unresolved limitation; no invented challenge/solution story is supplied. No matching public source repository was found; the website's GitHub source button stays omitted for this project.

## Skills and visual references

Demonstrated skills refer to the source/evidence above: C++17, Python, Qt/CMake, pandas/pathlib, JSON persistence, CSV normalization/validation and aggregation. The portfolio's own Astro/TypeScript stack is not treated as proof of David's proficiency.

Structure studied from [Ryan Fitzgerald's Dev Portfolio](https://github.com/RyanFitzgerald/devportfolio/tree/852d650fb0a8cf0c98f874af5a56a0a9b7d7d4b7); initial experience studied from [Denoax's portfolio](https://github.com/Denoax/portfolio/tree/72a3c7a2a75913de64d8baf1591282acd19d181c). Website application code and styling are original. No target/template code, personal images, text, fonts or sounds were copied. Old fictional music/CSV interface art and the illustrative music chart were removed from the revised website.

Files in `docs/previews/` are captures of this portfolio for review, not screenshots of the underlying student projects.
