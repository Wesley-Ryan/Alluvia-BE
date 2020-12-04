const server = require("./api/server");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 4000;
const path = require("path");

server.listen(port, () => {
  console.log(`****Listening on port:${port}****`);
});
