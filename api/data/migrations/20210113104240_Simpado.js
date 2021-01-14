exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("name", 255).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments("id");
      users.string("first_name", 255).notNullable();
      users.string("last_name", 255).notNullable();
      users.string("email", 255).notNullable().unique();
      users.string("password", 255).notNullable();
      users
        .integer("role")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("subscriptions", (subscriptions) => {
      subscriptions.increments("subcription_id");
      subscriptions.string("name", 128).notNullable();
      subscriptions.date("due_date").notNullable();
      subscriptions.integer("cost").notNullable();
      subscriptions.text("notes", 255);
      subscriptions
        .integer("owner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {};
