const Helper = require("./user-model.js");

const createBerry = () => {
  const berry = Math.random().toString(36).slice(7);
  return berry;
};

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
  try {
    const [user] = await Helper.findBy(email);
    if (user.length <= 0) {
      res.status(400).json({
        message:
          "We were unable to locate the requested user. *INVALID ACCOUNT REQUEST* ",
      });
    } else {
      const berry = createBerry();
      const changes = { ...user, pinpoint: berry };
      await Helper.update(user.id, changes);
      req.User = changes;
      //send to email
      //set code to users db
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validatePasswordReset = async (req, res, next) => {
  const berry = req.body.pinpoint;
  console.log(berry);
  try {
    // compare berry to user Berry
    const user = await Helper.findBerry(berry);
    console.log("MY user from BERRY", user);
    req.User = user;
    // if berries then
    //set user to req
    next();
    //if not berry good send error to client.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateUserId,
  validateUserEmail,
  validatePasswordReset,
};
