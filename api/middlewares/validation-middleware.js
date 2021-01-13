const jwt = require("jsonwebtoken");
const secret = "berries"; // move to env
const Helper = require("../users/user-model");

const validatePayload = (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    res.status(401).json("username and password required");
  } else {
    req.User = user;
    next();
  }
};

const validateUsernameUnique = async (req, res, next) => {
  try {
    const exsistingUser = await Helper.findBy(req.body.email);
    if (!exsistingUser.length) {
      next();
    } else {
      res
        .status(400)
        .json("Username is taken :(, please choose a unique username.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const validator = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json("token required");
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).json("invalid token");
      } else {
        req.decodedToken = decoded;
        req.userID = decoded.subject;
        next();
      }
    });
  }
};

const validatePermissions = (user) => {
  return Boolean(
    user.email && user.password && typeof user.password === "string"
  );
};

const validateUserFundraiserRole = (req, res, next) => {
  const { role } = req.headers;
  console.log(role);
  if (role != 1) {
    res.status(400).json({ message: "You must be a Fundrasier" });
  } else {
    next();
  }
};

module.exports = {
  validator,
  validatePermissions,
  validatePayload,
  validateUsernameUnique,
  validateUserFundraiserRole,
};
