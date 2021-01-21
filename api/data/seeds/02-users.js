exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Test",
          last_name: "Account",
          email: "test@simpado.com",
          password: "v2LFwjyBzSHP7f",
          role: 5,
        },
        {
          first_name: "Test",
          last_name: "Admin",
          email: "test-admin@simpado.com",
          password: "v2LFwjyBzSHP7f",
          role: 6,
        },
      ]);
    });
};
