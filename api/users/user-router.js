const express = require("express");
const Helper = require("./user-model");
const { validateUserId } = require("./user-middleware");
const { validator } = require("../middlewares/validation-middleware");
const { update } = require("../data/dbConfig");
const router = express.Router();

router.get("/:id", validateUserId, validator, (req, res) => {
  const { id } = req.params;
  let user = req.User;
  if (user.id != id) {
    res.status(400).json({ message: "Access Denied." });
  } else {
    let success = { ...user, subscriptions: ["these come later."] };
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

module.exports = router;
