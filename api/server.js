const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(`/api/*`, (req, res) => {
  res.json({ data: `We are up and running` });
});

module.exports = app;
