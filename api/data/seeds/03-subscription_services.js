exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("subscription_services")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("subscription_services").insert([
        { name: "Netflix" },
        { name: "Apple One" },
      ]);
    });
};
