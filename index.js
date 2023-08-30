import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import mongoose from "mongoose";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Zdravo!");
});

app.get("/health", (req, res) => {
  res.send("Working...");
});

app.use("/users", userRouter);

app.use("/auth", authRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/node-server")
  .then(() => console.log("Connected"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
