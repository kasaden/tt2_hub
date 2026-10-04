// Run with: node --test   (Node's built-in test runner, no dependencies)
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  SEARCH_THRESHOLD,
  validateRegistry,
  matchTools,
  listEvents,
  showSearch
} from "../lib/registry.js";

const registry = JSON.parse(readFileSync(new URL("../tools.json", import.meta.url), "utf8"));

/** A valid entry; override fields to build the case under test. */
function tool(overrides = {}) {
  return {
    id: "sample-tool",
    title: "Sample Tool",
    summary: "Does one thing.",
    facts: ["First fact"],
    event: "Sample Event",
    url: "https://example.org/sample/",
    author: { name: "kasaden", own: true },
    emblem: "assets/emblems/sample.svg",
    accent: "#a455cf",
    sources: [{ label: "community spreadsheet", url: "https://example.org/sheet" }],
    repo: "https://github.com/kasaden/sample",
    ...overrides
  };
}

describe("validateRegistry", () => {
  it("accepts the real registry", () => {
    assert.deepEqual(validateRegistry(registry), []);
  });

  it("points every emblem of the real registry at a file in the hub", () => {
    const missing = registry.tools.filter((t) => !existsSync(new URL(`../${t.emblem}`, import.meta.url)));
    assert.deepEqual(missing.map((t) => t.emblem), []);
  });

  it("accepts a minimal valid entry", () => {
    assert.deepEqual(validateRegistry({ tools: [tool()] }), []);
  });

  it("rejects a registry without a tools array", () => {
    assert.equal(validateRegistry({}).length, 1);
    assert.equal(validateRegistry([]).length, 1);
  });

  it("names the entry and the field when a required field is missing", () => {
    const problems = validateRegistry({ tools: [tool({ title: undefined })] });
    assert.equal(problems.length, 1);
    assert.match(problems[0], /sample-tool/);
    assert.match(problems[0], /title/);
  });

  it("rejects duplicate ids", () => {
    const problems = validateRegistry({ tools: [tool(), tool()] });
    assert.equal(problems.length, 1);
    assert.match(problems[0], /duplicate/i);
  });

  it("rejects an id that is not lowercase-with-dashes", () => {
    assert.equal(validateRegistry({ tools: [tool({ id: "Sample Tool" })] }).length, 1);
  });

  it("accepts a relative url for a tool hosted inside the hub", () => {
    assert.deepEqual(validateRegistry({ tools: [tool({ url: "tools/sample/" })] }), []);
  });

  it("rejects urls that are not https or relative", () => {
    for (const url of ["http://example.org/", "javascript:alert(1)", "//example.org/", ""]) {
      assert.equal(validateRegistry({ tools: [tool({ url })] }).length, 1, url);
    }
  });

  it("rejects an accent that is not a #rrggbb colour", () => {
    assert.equal(validateRegistry({ tools: [tool({ accent: "purple" })] }).length, 1);
  });

  it("allows at most three facts", () => {
    const facts = ["a", "b", "c", "d"];
    assert.equal(validateRegistry({ tools: [tool({ facts })] }).length, 1);
  });

  it("requires an author with a name and an own flag", () => {
    assert.equal(validateRegistry({ tools: [tool({ author: { name: "someone" } })] }).length, 1);
    assert.equal(validateRegistry({ tools: [tool({ author: { own: false } })] }).length, 1);
  });

  it("requires every source to have a label and an https url", () => {
    const sources = [{ label: "sheet", url: "http://example.org" }];
    assert.equal(validateRegistry({ tools: [tool({ sources })] }).length, 1);
  });

  it("treats event, facts, sources and repo as optional", () => {
    const minimal = tool();
    delete minimal.event;
    delete minimal.facts;
    delete minimal.sources;
    delete minimal.repo;
    assert.deepEqual(validateRegistry({ tools: [minimal] }), []);
  });
});

describe("matchTools", () => {
  const tools = [
    tool({ id: "alchemy", title: "TT2 Alchemy Optimizer", summary: "Best crafting path.", event: "Alchemy Lab" }),
    tool({ id: "depths", title: "Eggsplorer Depths", summary: "Depth maps and drops.", event: "Dungeon Eggsplorer" }),
    tool({ id: "calc", title: "Damage Calculator", summary: "Compare builds.", event: undefined })
  ];
  const ids = (list) => list.map((t) => t.id);

  it("returns every tool in registry order when there is no query", () => {
    assert.deepEqual(ids(matchTools(tools)), ["alchemy", "depths", "calc"]);
    assert.deepEqual(ids(matchTools(tools, { query: "   " })), ["alchemy", "depths", "calc"]);
  });

  it("matches the title regardless of case", () => {
    assert.deepEqual(ids(matchTools(tools, { query: "ALCHEMY" })), ["alchemy"]);
  });

  it("matches the summary and the event", () => {
    assert.deepEqual(ids(matchTools(tools, { query: "drops" })), ["depths"]);
    assert.deepEqual(ids(matchTools(tools, { query: "dungeon" })), ["depths"]);
  });

  it("requires every word of the query to match", () => {
    assert.deepEqual(ids(matchTools(tools, { query: "depth maps" })), ["depths"]);
    assert.deepEqual(ids(matchTools(tools, { query: "depth crafting" })), []);
  });

  it("restricts to one event", () => {
    assert.deepEqual(ids(matchTools(tools, { event: "Alchemy Lab" })), ["alchemy"]);
  });

  it("combines the event and the query", () => {
    assert.deepEqual(ids(matchTools(tools, { event: "Alchemy Lab", query: "maps" })), []);
  });
});

describe("listEvents", () => {
  it("lists each event once, in registry order, skipping tools without one", () => {
    const tools = [
      tool({ id: "a", event: "Dungeon Eggsplorer" }),
      tool({ id: "b", event: undefined }),
      tool({ id: "c", event: "Alchemy Lab" }),
      tool({ id: "d", event: "Dungeon Eggsplorer" })
    ];
    assert.deepEqual(listEvents(tools), ["Dungeon Eggsplorer", "Alchemy Lab"]);
  });
});

describe("showSearch", () => {
  it("hides search and filters below the threshold", () => {
    assert.equal(SEARCH_THRESHOLD, 6);
    assert.equal(showSearch(5), false);
    assert.equal(showSearch(6), true);
  });

  it("accepts another threshold", () => {
    assert.equal(showSearch(2, 1), true);
  });
});
