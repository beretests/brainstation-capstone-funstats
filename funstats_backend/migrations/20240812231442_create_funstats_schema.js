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
      table.integer("goals_scored");
      table.integer("assists");
      table.integer("shots_on_target");
      table.integer("tackles");
      table.integer("interceptions");
      table.integer("saves");
      table.integer("yellow_cards");
      table.integer("red_cards");
      table.integer("fouls");
      table.integer("headers_won");
      table.integer("offsides");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  // .createTable("friendship", (table) => {
  //   table.uuid("id").defaultTo(knex.fn.uuid()).primary();
  //   table
  //     .uuid("player1_id")
  //     .references("id")
  //     .inTable("players")
  //     .onUpdate("CASCADE")
  //     .onDelete("CASCADE");
  //   table
  //     .uuid("player2_id")
  //     .references("id")
  //     .inTable("players")
  //     .onUpdate("CASCADE")
  //     .onDelete("CASCADE");
  //   table.timestamp("updated_at").defaultTo(knex.fn.now());
  // });
};

export const down = function (knex) {
  return (
    knex.schema
      // .dropTable("friendship")
      .dropTable("stats")
      .dropTable("players")
  );
  // .dropTable("soccer_stars");
};
