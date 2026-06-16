import "dotenv/config";
import { app } from "./app.js";
import http from "http";
import connectDB from "./src/db/index.js";
import WebSocket, { WebSocketServer } from "ws";
import { getUserId } from "./src/utils/userUtils.js";

const PORT = process.env.PORT || 6060;
connectDB()
  .then(() => {
    const server = http.createServer(app);

    const wss = new WebSocketServer({ server });

    const connectedUsers = new Map();
    wss.on("connection", async (ws, req) => {
      const userId = await getUserId(req);
      if (!userId) {
        ws.send(
          JSON.stringify({ type: "error", message: "Authorization failed." }),
        );
        ws.close();
        return;
      }
      connectedUsers.set(userId, ws);
      //============================================
      //message payload dummy
      const dummy_payload = {
        type: "message.send",
        payload: {
          message_id: "",
          conversation_id: "",
          sender_id: "",
          receivers: [],

          content: {
            type: "text",
            text: "",
          },

          timeStamp: "",
          status: "send",
        },
      };
      //============================================

      ws.on("message", async (data) => {
        try {
          const user_payload = JSON.parse(data);
          const { type, payload } = user_payload;

          //send the message
          if (type == "message.send") {
            payload.receivers.forEach((rec) => {
              const recUser = connectedUsers.get(rec);

              if (recUser) {
                recUser.send(
                  JSON.stringify({
                    type: "message.receive",
                    payload: {
                      message_id: payload.message_id,
                      conversation_id: payload.conversation_id,
                      sender_id: userId,

                      content: payload.content,

                      timeStamp: new Date().toISOString(),
                      status: "delivered",
                    },
                  }),
                );
              }
            });
          }
        } catch (error) {
          ws.send("something wrong maybe invalid json");
        }
      });

      ws.on("close", () => {
        connectedUsers.delete(userId);
      });
    });

    wss.on("error", (ws, req) => {
      console.log(`ws have an error`);
    });

    server.listen(PORT, () => {
      console.log(`connected on port ${PORT}`);
    });

    server.on("error", (err) => {
      throw new Error("server started with error", err);
    });
  })
  .catch((err) => {
    console.log(err);
    throw new Error("app crashed at app");
  });
