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
      users.integer("pinpoint");
    })
    .createTable("subscription_services", (subscription_services) => {
      subscription_services.increments("subscription_services_id");
      subscription_services.string("name", 128).notNullable().unique();
    })
    .createTable("subscription", (subscription) => {
      subscription.increments("subcription_id");
      subscription.string("due_date").notNullable();
      subscription.integer("cost").notNullable();
      subscription.text("notes", 255);
      subscription
        .integer("owner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      subscription
        .integer("subscription_services_id")
        .unsigned()
        .notNullable()
        .references("subscription_services_id")
        .inTable("subscription_services")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("roles")
    .dropTableIfExists("users")
    .dropTableIfExists("subscription");
};
