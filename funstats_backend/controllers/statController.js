import createKnex from "knex";
import knexFile from "../knexfile.js";
const knex = createKnex(knexFile);

export const singleStat = async (req, res) => {
  try {
    const data = await knex("stat").where({ id: req.params.id });

    // If record is not found, respond with 404
    if (!data.length) {
      return res
        .status(404)
        .send(`Stat with id: ${req.params.id} is not found`);
    }

    // Knex returns an array of records, so we need to send response with a single object only
    res.json(data[0]);
  } catch (err) {
    res.status(400).send(`Error retrieving stat ${req.params.id}: ${err}`);
  }
};
