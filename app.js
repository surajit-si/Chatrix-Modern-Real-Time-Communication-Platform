import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());
//CORS Setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // allow cookies and more
  }),
);

//routers
import userRouter from "./src/routes/user.routes.js";

//user router
app.use("/api/v1/users", userRouter);

export { app };
