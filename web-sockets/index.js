import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";

const filePath = fileURLToPath(new URL("./index.html", import.meta.url));
const PORT = 3036;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(filePath));
});

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("chat message", (msg) => {
    console.log("resived message", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
