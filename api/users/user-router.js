const express = require("express");
const Helper = require("./user-model");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await Helper.findByID(id);
    if (user.length <= 0) {
      res
        .status(200)
        .json({ message: "We were unable to locate the requested user." });
    } else {
      user.password = null;
      let success = { ...user, subscriptions: ["these come later."] };
      res.status(200).json(success);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
