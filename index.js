import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./src/db/index.js";
import WebSocket, { WebSocketServer } from "ws";

const PORT = process.env.PORT || 6060;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB Connection Successful.on ${PORT}`);
    });
    app.on("error", () => {
      throw new Error("DB Connection failed!");
    });
  })
  .catch((err) => {
    console.log(err);
    throw new Error("app crashed at app");
  });

const wss = new WebSocketServer({ port: PORT });

const connectedUsers = new Map();
wss.on("connection", (ws, req) => {
  connectedUsers.set(Math.round(Math.random() * 100), ws); //dummy

  ws.on("message", (data) => {
    ws.send(data.toString());
    ws.send(JSON.stringify([...connectedUsers.entries()]));
  });
});

wss.on("error", (ws, req) => {
  console.log(`ws have an error`);
});

wss.on("close", (ws, req) => {
  console.log(`Ws is closed`);
});
