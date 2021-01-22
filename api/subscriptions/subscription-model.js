const db = require("../data/dbConfig");

module.exports = {
  getAll(id) {
    return db("subscription").where("owner_id", id);
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
};
