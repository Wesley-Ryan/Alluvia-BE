const e = require("express");
const Helper = require("./subscription-model");

const validateSubscriptionBody = (req, res, next) => {
  const id = req.userID;
  const subscription = { ...req.body, owner_id: id };

  if (!subscription.due_date || !subscription.cost) {
    res.status(400).json({
      Error: "Missing required text fields, due date and cost required.",
    });
  } else {
    req.Subscription = subscription;
    next();
  }
};

const validateUserSubsriptionOwner = async (req, res, next) => {
  const id = req.userID;
  const subID = req.params.subscriptionid;

  try {
    const [sub] = await Helper.getByID(subID);
    if (!sub) {
      res.status(400).json({
        message: "ERROR: The requested subscription does not exist",
      });
    } else if (id != sub.owner_id) {
      res.status(400).json({
        message: "You must be the owner to select this susbscription",
      });
    } else {
      req.subID = subID;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateSubscriptionBody,
  validateUserSubsriptionOwner,
};
