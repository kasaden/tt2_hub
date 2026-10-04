---
name: TT2 Hub
description: The way in to kasaden's Tap Titans 2 tools, laid out like the game's event tray.
colors:
  night: "#0e1118"
  night-surface: "#151925"
  night-raised: "#1c2132"
  night-high: "#252c42"
  line: "#2a3148"
  line-soft: "#202637"
  bone: "#ebe8de"
  mist: "#9ba3b8"
  dusk: "#7d869f"
  gold: "#dca644"
  gold-hi: "#f0c46a"
  gold-ink: "#1a1206"
  danger: "#e0766b"
  shadow-lift: "rgba(0, 0, 0, 0.8)"
  shadow-emblem: "rgba(0, 0, 0, 0.45)"
  wash-gold: "rgba(220, 166, 68, 0.07)"
  wash-blue: "rgba(70, 90, 160, 0.09)"
  alchemy-violet: "#a455cf"
  eggsplorer-gold: "#dca644"
typography:
  display:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  section:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Geist, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Geist, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  button:
    fontFamily: "Geist, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.55
  numeric:
    fontFamily: "Geist Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "tnum"
rounded:
  tag: "6px"
  ctl: "8px"
  panel: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.ctl}"
    padding: "12px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hi}"
    textColor: "{colors.gold-ink}"
  tool-tile:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.bone}"
    typography: "{typography.title}"
    rounded: "{rounded.panel}"
    padding: "32px 24px 24px"
  tool-tile-hover:
    backgroundColor: "{colors.night-raised}"
  detail-panel:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.bone}"
    rounded: "{rounded.panel}"
    padding: "32px"
  event-tag:
    backgroundColor: "{colors.night-high}"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "2px 8px"
  search-input:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.ctl}"
    padding: "10px 14px"
    height: "44px"
  filter-chip:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    rounded: "{rounded.ctl}"
    padding: "6px 12px"
  filter-chip-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
---

<!-- Written with the user before the first build (2026-10-04), from the tokens the two live tools already share plus the hub's own decisions, then aligned with the built home page after its finish review. -->

# Design System: TT2 Hub

## Overview

**Creative North Star: "The Event Tray"**

TT2 Hub is the shelf the player reaches for when an event starts: a tray of emblems, each one a tool, with the selected tool's details beside it. It belongs to the same family as the tools it lists. The Alchemy Optimizer and Eggsplorer Depths already share a night ground, a gold voice, Outfit and Geist, and the same corners and easing. The hub formalises that shared base and adds nothing that would make a tool look foreign once it moves inside the hub.

The hub is a way in, not a destination. Density is moderate: few elements, large touch targets, one clear action per tool. Each tool keeps its own colour and emblem, and the hub lets that colour do real work: it rings the tool's tile and tints the detail panel, so the page changes character with the tool under the pointer.

The look is quiet but finished: a fine grain on the night ground, tonal surfaces rather than heavy shadows, gold kept for the hub's own voice and its primary action.

**Key Characteristics:**
- Night ground with grain, tonal surfaces stepping up in lightness.
- Gold is the hub's voice; each tool brings its own accent from the registry.
- Emblems, not screenshots: every tool is recognised by a drawn mark.
- One action per tool, reachable in one click.
- Same tokens as the tools, so moving a tool into the hub costs no restyle.

## Colors

A night palette with one gold voice, plus one accent per tool, read from the registry.

### Primary
- **Event Gold** (`gold`): the hub's own voice. The primary button, the hub emblem's rim, the selected filter chip, focus rings. Never used for body text on the night ground below 15px.
- **Lit Gold** (`gold-hi`): hover state of gold elements, and highlights inside emblems.

### Secondary (per tool)
- **Tool accent** (the registry's `accent` field): rings the tool's tile on hover, focus and selection, and tints the detail panel's ground (8% of the accent mixed into `night-surface`, plus a 22% accent glow fading out from the panel's top edge). Today: **Alchemy Violet** (`alchemy-violet`) for the Alchemy Optimizer, taken from its badge, and **Eggsplorer Gold** (`eggsplorer-gold`) for Eggsplorer Depths, the colour of its egg. Eggsplorer Gold equals the hub's Event Gold, so with Eggsplorer selected the panel, its ring and the primary button share one colour; this is accepted because gold is Eggsplorer's own colour.
- **Panel secondary text**: inside the tinted panel, secondary text is mist mixed with 15% of the tool accent, never plain grey.

### Neutral
- **Night** (`night`): the page ground, under a 4.5% grain and two fixed ambient washes taken from Eggsplorer: **Gold Wash** (`wash-gold`) top left and **Blue Wash** (`wash-blue`) top right.
- **Night Surface** (`night-surface`): tiles, the detail panel, inputs.
- **Night Raised** (`night-raised`): hovered tiles, chips.
- **Night High** (`night-high`): tags, the pressed state.
- **Line** (`line`) and **Soft Line** (`line-soft`): borders and the footer rule.
- **Bone** (`bone`): primary text. **Mist** (`mist`): secondary text. **Dusk** (`dusk`): footnotes and the legal line, at 13px minimum.
- **Gold Ink** (`gold-ink`): text on gold.
- **Ember** (`danger`): load errors only.
- **Shadows** (`shadow-lift`, `shadow-emblem`): neutral black at 80% and 45%, the only shadow colours (see Elevation & Depth).

### Named Rules
**The Borrowed Colour Rule.** A tool's accent appears only where that tool is concerned: its tile and its panel. The hub never paints its own chrome in a tool's colour.

**The Contrast Floor Rule.** An accent used as a ring or indicator must reach 3:1 against `night`; text keeps 4.5:1. An accent that fails gets a lighter variant in the registry, never a thinner ring.

## Typography

**Display Font:** Outfit (with Segoe UI, system-ui)
**Body Font:** Geist (with Segoe UI, system-ui)
**Label/Mono Font:** Geist Mono, for counts only

**Character:** Outfit's round geometry carries the game's friendliness in titles. Geist keeps the reading text neutral and compact. Both are served from Google Fonts, like the tools.

### Hierarchy
- **Display** (700, clamp 2rem to 3rem, 1.05): the hub name, once per page.
- **Headline** (600, 1.75rem, 1.15): the tool title in the detail panel.
- **Section** (600, 1.25rem, 1.2): the heading over the tray.
- **Title** (600, 1.0625rem, 1.25): tool titles on tiles.
- **Lead** (400, 16px, 1.55): the summary in the detail panel.
- **Body** (400, 15px, 1.55): summaries and facts, 65ch maximum.
- **Button** (600, 15px, 1.55): the primary button.
- **Label** (500, 13px, 1.4): event tags, chips, quiet buttons, the footer.
- **Numeric** (Geist Mono 500, 13px, tabular figures): tool counts and result counts.

### Named Rules
**The No Eyebrow Rule.** No small label above a heading. The event is a tag beside or under the title, never a kicker above it.

## Layout

A centred column, 1200px maximum, with a 16px side gutter on phones and 32px from 768px. Spacing follows the 4px-based scale in the frontmatter, with more space above a heading than below it.

From 900px the home page splits into a tray (7 of 12 columns) and a sticky detail panel (5 of 12). The tray is a grid of tiles at least 220px wide, at least 248px tall, so a short registry still fills the tray's width. Below 900px there is no separate panel: each tile becomes a full-width row carrying its own summary and open link.

Search and filters sit above the tray and only appear once the registry holds 6 tools or more.

## Elevation & Depth

Depth comes from tonal steps (`night` to `night-high`), not from shadows. Two exceptions: the selected tile lifts with a soft neutral shadow, and emblems carry their own drawn highlights. Colour never glows: the tool accent lives in borders and the panel tint, never in a shadow.

### Shadow Vocabulary
- **Selected lift** (`box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.8)`): the tile under the pointer, focus, or selection only.
- **Emblem shadow** (`filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.45))`): the large emblem in the detail panel.

### Named Rules
**The Flat at Rest Rule.** Nothing casts a shadow at rest, except the large emblem in the detail panel, whose shadow seats the drawn badge on the tinted ground.

## Shapes

Gently rounded corners on a fixed scale: 12px for panels and tiles, 8px for controls, 6px for tags. Emblems are the only free shapes: circles, eggs, flasks drawn as SVG. Borders are 1px.

Emblem provenance: the Alchemy flask is copied from `tt2_alchemy_lab/favicon.svg`; the Eggsplorer egg is redrawn as SVG from Eggsplorer's CSS brand mark; the hub tray mark is drawn for the hub. Each SVG carries its origin in a comment.

## Components

### Buttons
- **Shape:** gently rounded (8px).
- **Primary:** gold with gold ink, 44px tall, button type, an arrow that nudges 3px on hover. One per panel: "Open" plus the tool's title.
- **Hover / Focus:** lit gold on hover; a 2px gold focus ring offset by 2px.
- **Quiet link:** mist text with a 1px underline in `line`, turning bone on hover. Used for the source code and community source links.

### Tool tile (signature)
- **Content:** the emblem at 88px on wide screens, the tool title, the event tag. The whole tile is the link to the tool.
- **Rest:** `night-surface`, 1px `line` border.
- **Hover / Focus / Selected:** the border takes the tool's accent, the ground steps to `night-raised`, the neutral selected lift appears, on wide screens the tile rises 2px and its emblem grows 6%, and the detail panel switches to this tool.
- **Phone:** a full-width row: the emblem at 48px on the left, the title, the event and the summary on the right.
- **Credit line:** under every tile, at every width, in dusk 13px: the community source and the source code as quiet links. It sits outside the tile link so each link is reachable by keyboard.

### Detail panel (signature)
- **Ground:** `night-surface` tinted with the selected tool's accent; 1px border of the accent mixed 35% into `line`; the accent glides to the next tool's over 0.45s.
- **Content:** the emblem at 96px, the headline title, the event tag and author, the summary, up to three facts, and the primary button.
- **Change:** a 240ms cross-fade with the hub easing when the selection changes; instant under reduced motion.

### Chips and search
- **Search:** `night-surface` field, 44px, 1px `line` border, gold focus ring.
- **Filter chips:** `night-raised`, mist text; selected chips turn gold with gold ink.
- **Empty result:** one line naming the query, and a button that clears it.

### Footer
- Dusk text at 13px above a soft line: the unofficial notice, the MIT licence and a link to the source.

## Do's and Don'ts

### Do:
- **Do** read every tool's title, event, accent and emblem from the registry; the markup never names a tool.
- **Do** keep the hub's tokens equal to the tools' shared tokens (`night`, `gold`, Outfit, Geist, 12px and 8px corners, easing `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Do** keep the unofficial notice on every page: "Unofficial. Tap Titans 2 is a trademark of Game Hive Corp. This site is not affiliated with or endorsed by Game Hive."
- **Do** keep motion to the panel cross-fade and tile state transitions, and remove it under `prefers-reduced-motion`.

### Don't:
- **Don't** show tools that do not exist, as "coming soon" or as empty slots.
- **Don't** use official Tap Titans 2 art or logos; emblems are drawn for the hub.
- **Don't** paint the hub's own chrome in a tool's accent.
- **Don't** put a small label or kicker above a heading.
- **Don't** add screenshots of the tools as tile content.
