export const up = function (knex) {
  return knex.schema
    .createTable("players", (table) => {
      table.uuid("id").defaultTo(knex.fn.uuid()).primary();
      table.string("username").notNullable().unique();
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.string("profile_pic");
      table.integer("DOB").notNullable();
      table.string("position");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("stats", (table) => {
      table.uuid("id").defaultTo(knex.fn.uuid()).primary();
      table.integer("date").notNullable();
      table
        .uuid("player_id")
        .references("id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("season").notNullable();
      table.string("game").notNullable();
      table.integer("goals_scored").defaultTo(0);
      table.integer("assists").defaultTo(0);
      table.integer("shots_on_target").defaultTo(0);
      table.integer("tackles").defaultTo(0);
      table.integer("interceptions").defaultTo(0);
      table.integer("saves").defaultTo(0);
      table.integer("yellow_cards").defaultTo(0);
      table.integer("red_cards").defaultTo(0);
      table.integer("fouls").defaultTo(0);
      table.integer("headers_won").defaultTo(0);
      table.integer("offsides").defaultTo(0);
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("friendship", function (table) {
      table.uuid("player1_id").notNullable();
      table.uuid("player2_id").notNullable();
      table.primary(["player1_id", "player2_id"]);
      table.check("?? < ??", ["player1_id", "player2_id"]);
      table.foreign("player1_id").references("id").inTable("players");
      table.foreign("player2_id").references("id").inTable("players");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

export const down = function (knex) {
  return knex.schema
    .dropTable("friendship")
    .dropTable("stats")
    .dropTable("players");
  // .dropTable("soccer_stars");
};
