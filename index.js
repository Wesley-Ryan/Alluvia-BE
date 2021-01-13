require("dotenv").config();
const server = require("./api/server.js");

const PORT = process.env.PORT || 3990;
server.listen(PORT, () => {
  console.log(`go brrrrp on:${PORT}`);
});
