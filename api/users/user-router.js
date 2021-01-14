const express = require("express");
const Helper = require("./user-model");
const { validateUserId } = require("./user-middleware");
const router = express.Router();

router.get("/:id", validateUserId, (req, res) => {
  let user = req.User;
  let success = { ...user, subscriptions: ["these come later."] };
  res.status(200).json(success);
});

module.exports = router;
