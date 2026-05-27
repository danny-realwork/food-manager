const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const dataDir = path.join(root, "data");
const statePath = path.join(dataDir, "state.json");
const port = Number(process.env.PORT) || Number(process.argv[2]) || 4174;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

ensureStateFile();

const server = http.createServer(async (req, res) => {
  try {
    const pathname = req.url.split("?")[0];

    if (pathname === "/api/state" && req.method === "GET") {
      sendJson(res, readState());
      return;
    }

    if (pathname === "/api/state" && req.method === "PUT") {
      const body = await readBody(req);
      const state = JSON.parse(body || "{}");
      writeState({
        inventory: Array.isArray(state.inventory) ? state.inventory : [],
        activities: Array.isArray(state.activities) ? state.activities : [],
        shopping: Array.isArray(state.shopping) ? state.shopping : []
      });
      sendJson(res, { ok: true });
      return;
    }

    if (pathname === "/api/upload" && req.method === "POST") {
      const buffer = await readBinaryBody(req);
      const { randomUUID } = require("crypto");
      const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.jpg`;
      const imagesDir = path.join(dataDir, "images");
      fs.mkdirSync(imagesDir, { recursive: true });
      fs.writeFileSync(path.join(imagesDir, filename), buffer);
      sendJson(res, { url: `/data/images/${filename}` });
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`상수집 식재료관리: http://localhost:${port}`);
});

function ensureStateFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(statePath)) {
    writeState({ inventory: [], activities: [], shopping: [] });
  }
}

function readState() {
  ensureStateFile();
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function writeState(state) {
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function sendJson(res, payload) {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 20 * 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function readBinaryBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const safePath = path.normalize(path.join(root, pathname));

  if (!safePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = path.extname(safePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  fs.createReadStream(safePath).pipe(res);
}
