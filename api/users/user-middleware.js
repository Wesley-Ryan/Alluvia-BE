const Helper = require("./user-model.js");
const { sendHelp } = require("../auth/auth-util");
const bcrypt = require("bcryptjs");

const createBerry = () => {
  const berry = Math.random().toString(36).slice(7);
  return berry;
};

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  console.log("HERE", id);
  try {
    const [user] = await Helper.findByID(id);
    if (!user) {
      res.status(400).json({ message: "We were unable to locate the user." });
    } else {
      req.User = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateUserEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [user] = await Helper.findBy(email);
    if (!user) {
      res.status(400).json({
        message:
          "We were unable to locate the requested user. *INVALID ACCOUNT REQUEST* ",
      });
    } else {
      const berry = createBerry();
      const changes = { ...user, pinpoint: berry };
      const savior = {
        user: user.email,
        first_name: user.first_name,
        verification: berry,
      };
      await Helper.update(user.id, changes);
      req.User = changes;
      sendHelp(savior.user, savior.first_name, savior.verification);
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validatePasswordReset = async (req, res, next) => {
  const berry = req.body.pinpoint;
  const resetChange = req.body.password;
  try {
    const [user] = await Helper.findBerry(berry);
    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid verification code. Try again." });
    } else {
      const hash = bcrypt.hashSync(resetChange, 9);
      const changes = { ...user, password: hash };
      const updated = await Helper.update(user.id, changes);
      req.User = updated;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateUserId,
  validateUserEmail,
  validatePasswordReset,
};
