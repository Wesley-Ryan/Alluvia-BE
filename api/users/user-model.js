const db = require("../data/dbConfig");

module.exports = {
  getAll() {
    return db("users");
  },
  findBy(email) {
    return db("users").where("email", email);
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
};
