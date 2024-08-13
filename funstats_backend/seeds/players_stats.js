// import seed data files, arrays of objects
import playerData from "../seed_data/players.js";
import statData from "../seed_data/stats.js";

export const seed = async function (knex) {
  await knex("stat").del();
  await knex("stat").insert(statData);
  await knex("player").del();
  await knex("player").insert(playerData);
};
