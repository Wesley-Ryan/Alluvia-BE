const express = require("express");
const Helper = require("./user-model");
const { validateUserId } = require("./user-middleware");
const router = express.Router();

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  let user = req.User;
  if (user.id != id) {
    res.status(400).json({ message: "Access Denied." });
  } else {
    let success = { ...user, subscriptions: ["these come later."] };
    res.status(200).json(success);
  }
});

module.exports = router;
