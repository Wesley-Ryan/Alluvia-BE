const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const Auth = require("./auth/auth-router");
const userRouter = require("./users/user-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan("common"));
server.use(express.json());

server.use("/account", Auth);
server.use("/users", userRouter);
server.get("/", (_, res) => {
  res.send({ message: "Support Open Source :)" });
});
module.exports = server;
