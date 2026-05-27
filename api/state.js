const fs = require("fs");
const path = require("path");

const localStatePath = path.join(process.cwd(), "data", "state.json");
const blobPathname = "home-inventory/state.json";

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    if (req.method === "GET") {
      const state = await readState();
      res.statusCode = 200;
      res.end(JSON.stringify(state));
      return;
    }

    if (req.method === "PUT") {
      const state = normalizeState(await readRequestJson(req));
      await writeState(state);
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};

async function readState() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return readBlobState();
  }

  if (!fs.existsSync(localStatePath)) {
    return emptyState();
  }

  return JSON.parse(fs.readFileSync(localStatePath, "utf8"));
}

async function writeState(state) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(blobPathname, JSON.stringify(state), {
      access: "public",
      allowOverwrite: true
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for persistent Vercel storage");
  }

  fs.mkdirSync(path.dirname(localStatePath), { recursive: true });
  fs.writeFileSync(localStatePath, `${JSON.stringify(state, null, 2)}\n`);
}

async function readBlobState() {
  const { list } = await import("@vercel/blob");

  try {
    const { blobs } = await list({ prefix: blobPathname });
    const blob = blobs.find(b => b.pathname === blobPathname);
    if (!blob) return emptyState();

    const response = await fetch(blob.url);
    if (!response.ok) return emptyState();

    return await response.json();
  } catch {
    return emptyState();
  }
}

function readRequestJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 20 * 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

async function streamToText(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return text;
}

function normalizeState(state) {
  return {
    inventory: Array.isArray(state.inventory) ? state.inventory : [],
    activities: Array.isArray(state.activities) ? state.activities : [],
    shopping: Array.isArray(state.shopping) ? state.shopping : []
  };
}

function emptyState() {
  return {
    inventory: [],
    activities: [],
    shopping: []
  };
}
