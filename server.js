"use strict";

// dev server: serves the hub's files on localhost. GitHub Pages serves them in production.

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = __dirname;
const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4180);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${HOST}`);
  let file = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname)));

  if (!file.startsWith(ROOT)) {
    response.writeHead(403).end();
    return;
  }

  try {
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, "index.html");
    const body = await fs.readFile(file);
    response.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found");
  }
});

server.listen(PORT, HOST, () => console.log(`TT2 Hub on http://${HOST}:${PORT}/`));
