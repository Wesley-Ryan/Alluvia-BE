const express = require("express");
const { validator } = require("../middlewares/validation-middleware");
const {
  validateSubscriptionBody,
  validateUserSubsriptionOwner,
} = require("./subscription-middleware");
const SubscriptionHelper = require("./subscription-model");
const router = express.Router();

router.get("/subscriptions", validator, async (req, res) => {
  const id = req.userID;
  const subscriptions = await SubscriptionHelper.getAll(id);
  if (subscriptions.length < 1) {
    res.status(200).json({ message: "Need to add some subscriptions" });
  } else {
    res.status(200).json(subscriptions);
  }
});
router.get(
  "/subscriptions/:subscriptionid",
  validator,
  validateUserSubsriptionOwner,
  async (req, res) => {
    const subID = req.subID;
    try {
      const [subscription] = await SubscriptionHelper.getByID(subID);

      res.status(200).json(subscription);
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
  validateUserSubsriptionOwner,
  async (req, res) => {
    const subID = req.subID;
    const updates = { ...req.body, owner_id: req.userID };

    try {
      const [updatedSubscription] = await SubscriptionHelper.update(
        subID,
        updates
      );
      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/:id/subscriptions/:subscriptionid",
  validator,
  async (req, res) => {
    const { subscriptionid } = req.params;
    const id = req.userID;
    try {
      const getSubs = await SubscriptionHelper.getAll(id);
      if (id != getSubs.owner_id) {
        res.status(400).json({
          Error: "Error: You must be the owner to remove this subscription.",
        });
      } else {
        const remaining = await SubscriptionHelper.remove(subscriptionid, id);
        res.status(201).json(remaining);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
