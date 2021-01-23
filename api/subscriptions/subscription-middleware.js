const e = require("express");
const Helper = require("./subscription-model");

const validateSubscriptionBody = (req, res, next) => {
  const subscription = req.body;
  if (!subscription.due_date || !subscription.cost) {
    res.status(400).json({
      Error: "Missing required text fields, due date and cost required.",
    });
  } else {
    req.Subscription = subscription;
    next();
  }
};

module.exports = {
  validateSubscriptionBody,
};
