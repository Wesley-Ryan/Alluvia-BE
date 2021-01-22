const express = require("express");
const Helper = require("./user-model");
const {
  validateUserId,
  validateUserEmail,
  validatePasswordReset,
} = require("./user-middleware");
const {
  validator,
  validateUserFundraiserRole,
} = require("../middlewares/validation-middleware");
const router = express.Router();

router.get("/:id", validateUserId, validator, (req, res) => {
  const { id } = req.params;
  let user = req.User;
  if (user.id != id) {
    res.status(400).json({ message: "Access Denied." });
  } else {
    let success = {
      ...user,
      password: null,
      pinpoint: "",
      subscriptions: ["these come later."],
    };
    res.status(200).json(success);
  }
});
router.put("/:id", validateUserId, validator, async (req, res) => {
  const { id } = req.params;
  let user = req.User;
  const changes = req.body;
  try {
    const updated = await Helper.update(id, changes);
    console.log(updated);
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//holder for password reset test.
router.post("/account/send/help", validateUserEmail, (req, res) => {
  res.status(200).json({ message: "Success" });
});
router.post("/account/v8/challenge", validatePasswordReset, (req, res) => {
  const user = req.User;

  res.status(200).json(user);
});

module.exports = router;
