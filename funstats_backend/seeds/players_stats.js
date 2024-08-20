// import seed data files, arrays of objects
import playerData from "../seed_data/players.js";
import statData from "../seed_data/stats.js";
import friendshipData from "../seed_data/friendship.js";

export const seed = async function (knex) {
  await knex("players").del();
  await knex("players").insert(playerData);
  await knex("stats").del();
  await knex("stats").insert(statData);
  await knex("friendship").del();
  await knex("friendship").insert(friendshipData);
};
