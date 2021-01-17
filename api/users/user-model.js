const { update } = require("../data/dbConfig");
const db = require("../data/dbConfig");

module.exports = {
  getAll() {
    return db("users");
  },
  findBy(email) {
    return db("users").where("email", email);
  },
  findBerry(berry) {
    return db("users").where("pinpoint", berry);
  },

  findByID(id) {
    return db("users").where("id", id);
  },

  async create(user) {
    try {
      await db("users").insert(user);
      return "User Created";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async update(id, changes) {
    try {
      await db("users").where("id", id).update(changes);
      return db("users").where("id", id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
