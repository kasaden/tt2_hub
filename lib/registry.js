// The tool registry: validation and lookup. No DOM, so it runs the same in the page and in Node (the tests).

/** Search and filters only appear once the registry holds this many tools. */
export const SEARCH_THRESHOLD = 6;

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HEX = /^#[0-9a-f]{6}$/i;
const MAX_FACTS = 3;

const isText = (value) => typeof value === "string" && value.trim() !== "";
const isHttps = (value) => isText(value) && /^https:\/\/[^\s/]+/.test(value);
// relative to the hub: "tools/<id>/", never "//host" or a scheme such as "javascript:"
const isRelative = (value) => isText(value) && !/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.startsWith("//");

/**
 * Checks the shape of tools.json. Returns a list of problems, empty when the registry is valid.
 * Each problem names the entry (its id, or its position) and the field.
 */
export function validateRegistry(data) {
  if (!data || !Array.isArray(data.tools)) return ["The registry needs a \"tools\" array."];

  const problems = [];
  const seen = new Set();

  data.tools.forEach((tool, index) => {
    const name = isText(tool?.id) ? tool.id : `entry ${index + 1}`;
    const problem = (text) => problems.push(`${name}: ${text}`);

    if (!tool || typeof tool !== "object") return problem("is not an object");

    if (!isText(tool.id) || !ID.test(tool.id)) problem("id must be lowercase words joined by dashes");
    else if (seen.has(tool.id)) problem("duplicate id");
    else seen.add(tool.id);

    for (const field of ["title", "summary", "emblem"]) {
      if (!isText(tool[field])) problem(`${field} is required`);
    }

    if (!isHttps(tool.url) && !isRelative(tool.url)) problem("url must be https:// or a path inside the hub");
    if (!isText(tool.accent) || !HEX.test(tool.accent)) problem("accent must be a #rrggbb colour");

    if (!tool.author || !isText(tool.author.name) || typeof tool.author.own !== "boolean") {
      problem("author needs a name and an own flag (true for kasaden's tools)");
    }

    if (tool.event !== undefined && !isText(tool.event)) problem("event must be text");
    if (tool.repo !== undefined && !isHttps(tool.repo)) problem("repo must be an https:// url");

    if (tool.facts !== undefined) {
      if (!Array.isArray(tool.facts) || !tool.facts.every(isText)) problem("facts must be a list of text");
      else if (tool.facts.length > MAX_FACTS) problem(`at most ${MAX_FACTS} facts`);
    }

    if (tool.sources !== undefined) {
      const valid = Array.isArray(tool.sources) && tool.sources.every((s) => isText(s?.label) && isHttps(s?.url));
      if (!valid) problem("each source needs a label and an https:// url");
    }
  });

  return problems;
}

/**
 * Tools that match a free-text query (every word must appear in the title, summary or event)
 * and, when given, one event. Registry order is kept.
 */
export function matchTools(tools, { query = "", event = null } = {}) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return tools.filter((tool) => {
    if (event && tool.event !== event) return false;
    const text = [tool.title, tool.summary, tool.event].filter(Boolean).join(" ").toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/** Each event once, in registry order. */
export function listEvents(tools) {
  return [...new Set(tools.map((tool) => tool.event).filter(Boolean))];
}

export function showSearch(count, threshold = SEARCH_THRESHOLD) {
  return count >= threshold;
}
