const express = require("express");
const { validator } = require("../middlewares/validation-middleware");
const { validateSubscriptionBody } = require("./subscription-middleware");
const SubscriptionHelper = require("./subscription-model");
const router = express.Router();

router.get("/:id/subscriptions", validator, async (req, res) => {
  const { id } = req.params;
  const [subscriptions] = await SubscriptionHelper.getAll(id);
  if (!subscriptions) {
    res.status(200).json({ message: "Need to add some subscriptions" });
  } else {
    res.status(200).json(subscriptions);
  }
});
router.get(
  "/:id/subscriptions/:subscriptionid",
  validator,
  async (req, res) => {
    const subID = req.params.subscriptionid;
    try {
      const [subscription] = await SubscriptionHelper.getByID(subID);
      if (!subscription) {
        res.status(400).json({
          message:
            "ERROR: Invalid ID, please try again or contact support for more help.",
        });
      } else {
        res.status(200).json(subscription);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/:id/subscriptions",
  validator,
  validateSubscriptionBody,
  async (req, res) => {
    try {
      const newSubscription = await SubscriptionHelper.create(req.Subscription);
      res.status(201).json(newSubscription);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/:id/subscriptions/:subscriptionid",
  validator,
  async (req, res) => {
    const subID = req.params.subscriptionid;
    const updates = req.body;
    try {
      const [updatedSubscription] = await SubscriptionHelper.update(
        subID,
        updates
      );
      if (!updatedSubscription) {
        res.status(400).json({
          message:
            "ERROR: Invalid ID, please try again or contact support for more help.",
        });
      } else {
        res.status(200).json(updatedSubscription);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
