const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Auth = require("./auth/auth-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/account", Auth);

server.get("/", (_, res) => {
  res.send({ message: "Support Open Source :)" });
});
module.exports = server;
