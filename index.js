import { validateRegistry, matchTools, listEvents, showSearch, SEARCH_THRESHOLD } from "./lib/registry.js";

const $ = (id) => document.getElementById(id);

const tray = $("tray");
const panel = $("panel");
const finder = $("finder");
const search = $("search");
const eventFilters = $("eventFilters");

const SVG_NS = "http://www.w3.org/2000/svg";
const ICONS = {
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  check: ["M5 12.5l4.5 4.5L19 7.5"]
};

let tools = [];
let selectedId = null;
let query = "";
let event = null;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(name, className) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2.2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  if (className) svg.setAttribute("class", className);
  for (const d of ICONS[name]) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    svg.append(path);
  }
  return svg;
}

function emblem(tool, className, size) {
  const img = el("img", className);
  img.src = tool.emblem;
  img.alt = "";
  img.width = size;
  img.height = size;
  return img;
}

/** "Data: X · Source code", the credit line under each tile. */
function creditLine(tool) {
  const line = el("p", "tile-links");
  const parts = [];
  for (const source of tool.sources ?? []) {
    const link = el("a", null, source.label);
    link.href = source.url;
    parts.push(["Data: ", link]);
  }
  if (tool.repo) {
    const link = el("a", null, "Source code");
    link.href = tool.repo;
    parts.push([link]);
  }
  parts.forEach((nodes, index) => {
    if (index > 0) line.append(" · ");
    line.append(...nodes);
  });
  return parts.length ? line : null;
}

function tile(tool) {
  const item = el("li", "tray-item");

  const link = el("a", "tile");
  link.href = tool.url;
  link.dataset.id = tool.id;
  link.style.setProperty("--accent", tool.accent);

  const text = el("span", "tile-text");
  text.append(el("span", "tile-title", tool.title));
  if (tool.event) text.append(el("span", "tag", tool.event));
  text.append(el("span", "tile-summary", tool.summary));

  link.append(emblem(tool, "tile-emblem", 72), text, icon("arrow", "tile-go"));

  // hovering or focusing a tile shows it in the panel; clicking it opens the tool
  link.addEventListener("pointerenter", () => select(tool.id));
  link.addEventListener("focus", () => select(tool.id));

  item.append(link);
  const credit = creditLine(tool);
  if (credit) item.append(credit);
  return item;
}

function renderPanel(tool) {
  panel.hidden = !tool;
  if (!tool) return;

  panel.style.setProperty("--accent", tool.accent);

  const inner = el("div", "panel-inner is-entering");
  inner.append(emblem(tool, "panel-emblem", 96));

  const title = el("h2", "panel-title", tool.title);
  title.id = "panelTitle";
  inner.append(title);

  const meta = el("p", "panel-meta");
  if (tool.event) meta.append(el("span", "tag", tool.event));
  meta.append(el("span", null, tool.author.own ? "By kasaden" : `By ${tool.author.name}, not one of kasaden's tools`));
  inner.append(meta);

  inner.append(el("p", "panel-summary", tool.summary));

  if (tool.facts?.length) {
    const facts = el("ul", "facts");
    for (const fact of tool.facts) {
      const li = el("li");
      li.append(icon("check"), el("span", null, fact));
      facts.append(li);
    }
    inner.append(facts);
  }

  const open = el("a", "btn-primary", `Open ${tool.title}`);
  open.href = tool.url;
  open.append(icon("arrow"));
  inner.append(open);

  panel.replaceChildren(inner);
}

function select(id) {
  if (id === selectedId) return;
  selectedId = id;
  for (const link of tray.querySelectorAll(".tile")) {
    link.classList.toggle("is-selected", link.dataset.id === id);
  }
  renderPanel(tools.find((tool) => tool.id === id));
}

function renderFilters() {
  const options = [null, ...listEvents(tools)];
  eventFilters.replaceChildren(
    ...options.map((value) => {
      const chip = el("button", "chip", value ?? "All events");
      chip.type = "button";
      chip.setAttribute("aria-pressed", String(value === event));
      chip.addEventListener("click", () => {
        event = value;
        renderFilters();
        render();
      });
      return chip;
    })
  );
}

function render() {
  const visible = matchTools(tools, { query, event });
  const filtering = query.trim() !== "" || event !== null;

  tray.replaceChildren(...visible.map(tile));
  $("toolCount").textContent = filtering ? `${visible.length} of ${tools.length}` : String(tools.length);

  $("emptyResult").hidden = visible.length > 0;
  if (!visible.length) {
    const what = [query.trim() && `“${query.trim()}”`, event].filter(Boolean).join(" in ");
    $("emptyText").textContent = `No tool matches ${what}.`;
  }

  // keep the panel on a tool the visitor can see
  const keep = visible.some((tool) => tool.id === selectedId);
  const next = keep ? selectedId : visible[0]?.id ?? null;
  selectedId = null;
  select(next);
  if (next === null) renderPanel(null);
}

async function start() {
  // only say "loading" when it is slow enough to notice
  const slow = setTimeout(() => ($("loading").hidden = false), 300);
  let data;
  try {
    const response = await fetch("tools.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (error) {
    console.error("tools.json:", error);
    $("loadError").hidden = false;
    return;
  } finally {
    clearTimeout(slow);
    $("loading").hidden = true;
  }

  const problems = validateRegistry(data);
  if (problems.length) console.warn("tools.json problems:\n" + problems.join("\n"));
  // a broken entry is left out rather than shown half-drawn
  tools = (data.tools ?? []).filter((tool) => validateRegistry({ tools: [tool] }).length === 0);

  const threshold = Number(document.body.dataset.searchThreshold) || SEARCH_THRESHOLD;
  finder.hidden = !showSearch(tools.length, threshold);
  if (!finder.hidden) renderFilters();

  render();
}

search.addEventListener("input", () => {
  query = search.value;
  render();
});

$("clearSearch").addEventListener("click", () => {
  query = "";
  event = null;
  search.value = "";
  renderFilters();
  render();
  search.focus();
});

$("reload").addEventListener("click", () => location.reload());

start();
