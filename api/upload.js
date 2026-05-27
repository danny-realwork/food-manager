const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const localImagesDir = path.join(process.cwd(), "data", "images");

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.jpg`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`images/${filename}`, buffer, {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: false
      });
      res.statusCode = 200;
      res.end(JSON.stringify({ url: blob.url }));
      return;
    }

    fs.mkdirSync(localImagesDir, { recursive: true });
    fs.writeFileSync(path.join(localImagesDir, filename), buffer);
    res.statusCode = 200;
    res.end(JSON.stringify({ url: `/data/images/${filename}` }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};
