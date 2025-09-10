import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import dbConnection from "./db_connection.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config();
dbConnection();

const app = express();
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("User connected via WebSocket");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("User disconnected");
  });
});

// Middleware to inject WebSocket server into req
app.use((req, res, next) => {
  req.wss = wss;
  next();
});

app.use(express.json());
app.use("/api", taskRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
 