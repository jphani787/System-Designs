import express from "express";
import { fileURLToPath } from "url";
import { join } from "node:path";

const filePath = fileURLToPath(new URL("./index.html", import.meta.url));

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
  res.sendFile(join(filePath));
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");
  res.write(`data: Welcome to Server sent event \n\n`);
  const intervelId = setInterval(() => {
    res.write(`data: comming ${new Date().toLocaleDateString()} \n\n`);
  }, 5000);
  res.on("close", () => {
    clearInterval(intervelId);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
