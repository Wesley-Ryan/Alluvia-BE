const express = require("express");
const SubscriptionHelper = require("./subscription-model");
const router = express.Router();

router.get("/:id/subscriptions", async (req, res) => {
  const { id } = req.params;
  const subscriptions = await SubscriptionHelper.getAll(id);
  if (subscriptions.length < 1) {
    res.status(200).json({ message: "Need to add some subscriptions" });
  } else {
    res.status(200).json(subscriptions);
  }
});

router.post("/:id/subscriptions", async (req, res) => {
  const newSubscription = req.body;

  try {
    await SubscriptionHelper.create(newSubscription);
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
