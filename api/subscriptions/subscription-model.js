const db = require("../data/dbConfig");

module.exports = {
  async getAll(id) {
    const subs = await db("subscription as s")
      .join(
        "subscription_services as ss",
        "ss.subscription_services_id",
        "s.subscription_services_id"
      )
      .where("owner_id", id);
    return subs;
  },
  async getByID(id) {
    const subs = await db("subscription as s")
      .join(
        "subscription_services as ss",
        "ss.subscription_services_id",
        "s.subscription_services_id"
      )
      .where("subcription_id", id);
    return subs;
  },

  async create(subscription) {
    try {
      await db("subscription").insert(subscription);
      return "Account Added";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async update(id, changes) {
    try {
      await db("subscription").where("subcription_id", id).update(changes);
      return db("subscription").where("subcription_id", id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async remove(id, owner) {
    try {
      await db("subscription").where("subcription_id", id).del();
      const remainingSubs = await this.getAll(owner);
      return remainingSubs;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
