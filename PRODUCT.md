# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (the user offered Next.js, React or static HTML/CSS/JS and left the choice to Claude). Chosen: **static HTML, CSS and JavaScript, no framework, no build step, deployed on GitHub Pages.**

Why:
- The two existing tools are built the same way (plain HTML/CSS/JS, no build, GitHub Pages). Tools are meant to move into the hub over time; with the same stack, bringing one in means moving its folder, not rewriting it in React.
- The hub is a directory first. A data-driven registry (one entry per tool) covers the growth to many tools without a framework.
- To revisit if the hub has to generate many pages of its own (guides, per-tool pages with shared templates): a static site generator or a Next.js static export would then be worth the build step.

## Users

Tap Titans 2 players, the whole community (not one clan), in English. They come for a tool tied to what they are doing in the game, often a temporary event (Alchemy Lab, Dungeon Eggsplorer), and want to reach the right tool fast.

## Product Purpose

`tt2_hub` is the central entry point for the user's Tap Titans 2 tools and resources: a directory that presents each tool and links to it.

It starts small, with the two tools already public, and must be built as an extensible base that can take many more tools over time without being restructured. Success: adding a tool is adding an entry, and a player can find the tool they need among many.

Out of scope for now: building any of the future tools. Only the base is being built.

## Positioning

One place for the user's own TT2 tools, made by the same author with the same approach. The existing tools are exact where it matters (the Alchemy optimizer says whether a plan is proven optimal) and are built from community spreadsheets that they credit.

## Operating Context

- Each tool currently lives in its own repository and GitHub Pages site. The hub links out to them.
- Over time the user will integrate tools into the hub one by one. The architecture must allow both cases at once: a tool hosted elsewhere and a tool hosted inside the hub.
- Many TT2 tools are tied to temporary in-game events that come back periodically.
- Sibling repositories, **read-only for any work in this project, never modify them**:
  - `../tt2_alchemy_lab`, https://kasaden.github.io/tt2_alchemy_lab/
  - `../tt2_dungeon_eggsplorer`, https://kasaden.github.io/tt2_dungeon_eggsplorer/
- Repository: https://github.com/kasaden/tt2_hub (expected Pages URL: https://kasaden.github.io/tt2_hub/, not yet published).

## Capabilities and Constraints

Current tools:

| Tool (user's name) | Title on its site | What it does | URL |
| --- | --- | --- | --- |
| TT2 Alchemy Lab | TT2 Alchemy Optimizer | Finds the best crafting path for your Alchemy Lab inventory (exact optimizer, recipe book) | https://kasaden.github.io/tt2_alchemy_lab/ |
| TT2 Dungeon Eggsplorer | Eggsplorer Depths | Community Dungeon Eggsplorer depth maps: the path through each depth and what it drops | https://kasaden.github.io/tt2_dungeon_eggsplorer/ |

Possible future tools (examples given by the user, not to be built now, not to be shown as existing or "coming soon" unless the user asks): Abyssal Tournament optimizer, Monument optimizer, Artifact optimizer, tools for temporary events, calculators, visualisations, interactive guides, other community tools.

Constraints:
- Client-side only, like the existing tools. No backend.
- Tool data is the source of truth and lives in one place (a registry), not repeated across the markup.

Open decisions:
- **Third-party tools**: whether the hub will also list tools made by other people (for example tt2.bagu.biz or the community spreadsheets). Not decided: the registry must allow it (an author field, a clear distinction from the user's own tools), but nothing third-party is listed for now.
- **Tool names**: the names the user uses (TT2 Alchemy Lab, TT2 Dungeon Eggsplorer) differ from the titles on the sites (TT2 Alchemy Optimizer, Eggsplorer Depths). Which name the hub shows is to be confirmed.

## Brand Commitments

- Unofficial fan project. The existing tools carry this notice, and the hub must too: "Unofficial. Tap Titans 2 is a trademark of Game Hive Corp. This site is not affiliated with or endorsed by Game Hive."
- MIT licence, copyright kasaden (as in the existing tools).
- Community sources are credited by the tools that use them.

## Evidence on Hand

- The two live tools and their READMEs (`../tt2_alchemy_lab/README.md`, `../tt2_dungeon_eggsplorer/README.md`).
- Existing assets in the sibling repos: `../tt2_alchemy_lab/favicon.svg`, `../tt2_dungeon_eggsplorer/og-image.png`. Read-only, copy them only if the user agrees.
- No usage numbers, testimonials, player counts or press. None may be invented.
- No official Tap Titans 2 art or logo is cleared for use.

## Product Principles

1. **Adding a tool is adding data.** A new tool is one registry entry, never a change to the page structure.
2. **Built to grow, honest about now.** The base handles many tools, but the hub only shows what exists.
3. **Get the player to the tool.** The hub is a way in, not a destination: finding and opening the right tool comes first.
4. **Same approach as the tools.** Plain web, client-side, no build, so a tool can move into the hub without a rewrite.
5. **Credit and disclaim.** Unofficial status and sources stay visible, for the user's tools and for any third-party tool listed later.
