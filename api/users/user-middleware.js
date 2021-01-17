const Helper = require("./user-model.js");

const validateUserId = async (req, res, next) => {
  const id = req.headers.user_id;
  try {
    const [user] = await Helper.findByID(id);
    if (user.length < 0) {
      res.status(400).json({ message: "We were unable to locate the user." });
    } else {
      user.password = null;
      req.User = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateUserEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log("email", email);
  try {
    const user = await Helper.findBy(email);
    if (user.length <= 0) {
      res.status(400).json({
        message:
          "We were unable to locate the requested user. *INVALID ACCOUNT REQUEST* ",
      });
    } else {
      req.User = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateUserId,
  validateUserEmail,
};
