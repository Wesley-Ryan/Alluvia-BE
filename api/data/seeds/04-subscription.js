exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("subscription")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("subscription").insert([
        {
          due_date: "2/2/2020",
          cost: 15.99,
          notes: "NetFlix Premium plan: 4 devices with Ultra HD included.",
          owner_id: 1,
          subscription_services_id: 1,
        },
      ]);
    });
};
