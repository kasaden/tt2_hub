# TT2 Hub

The way in to kasaden's Tap Titans 2 tools: pick the tool for your event and open it.

**Site:** https://kasaden.github.io/tt2_hub/ (not published yet)

100 % client-side, plain HTML, CSS and JavaScript: no framework, no build step, like the tools it lists.

## Adding a tool

A tool is one entry in `tools.json`. The page reads everything from there; the markup never names a tool.

| Field | Required | What it is |
| --- | --- | --- |
| `id` | yes | lowercase words joined by dashes, unique |
| `title` | yes | the title shown on the tool's own site |
| `summary` | yes | one sentence: what it does |
| `facts` | no | up to 3 short facts, shown in the detail panel |
| `event` | no | the in-game event it belongs to; becomes a filter |
| `url` | yes | `https://…` for a tool hosted elsewhere, or a path such as `tools/<id>/` for a tool moved into the hub |
| `author` | yes | `{ "name": "…", "own": true }`; `own: false` marks a tool made by someone else |
| `emblem` | yes | path to an SVG in `assets/emblems/` |
| `accent` | yes | `#rrggbb`, the tool's colour: rings its tile and tints the panel. It must reach 3:1 on `#0e1118` |
| `sources` | no | `[{ "label": "…", "url": "https://…" }]`, the community sources it is built from |
| `repo` | no | the tool's source code |

Run the tests after editing: they validate the registry and check that every emblem file exists.

Search and filters appear on their own once the registry holds 6 tools (`SEARCH_THRESHOLD` in `lib/registry.js`).

## Run locally

```
node server.js     # http://127.0.0.1:4180/
node --test        # unit tests, Node's built-in test runner
```

Node.js 22.7 or newer. Nothing to install.

## Files

```
index.html, style.css, index.js   # the home page
tools.json                        # the registry, the only source of tool data
lib/registry.js                   # validation and search, no DOM
assets/emblems/                   # one SVG per tool, plus the hub's own mark
tests/registry.test.js            # unit tests
DESIGN.md                         # the visual system
PRODUCT.md                        # who it is for and why
```

## Licence

MIT, © 2026 kasaden. Unofficial. Tap Titans 2 is a trademark of Game Hive Corp. This site is not affiliated with or endorsed by Game Hive.
