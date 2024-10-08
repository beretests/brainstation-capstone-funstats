import createKnex from "knex";
import knexFile from "../knexfile.js";
const knex = createKnex(knexFile);

export const singleStat = async (req, res) => {
  try {
    const data = await knex("stats").where({ player_id: req.params.id });

    if (!data.length) {
      return res
        .status(404)
        .send(`Stat with id: ${req.params.id} is not found`);
    }

    res.json(data[0]);
  } catch (err) {
    res.status(400).send(`Error retrieving stat ${req.params.id}: ${err}`);
  }
};

export const getSeasons = async (_req, res) => {
  try {
    const data = await knex("stats").distinct("season").orderBy("season");
    // const data = await knex.select("season").table("stats");

    // if (!data.length) {
    //   return res.status(404).send(`No season found`);
    // }

    res.json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving seasons: ${err}`);
  }
};
