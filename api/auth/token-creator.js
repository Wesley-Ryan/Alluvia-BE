const jwt = require("jsonwebtoken");

const secret = "berries"; //move to env
function tokenCreator(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    role: user.role,
  };
  const options = {
    expiresIn: "4h",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = tokenCreator;
