import createKnex from "knex";
import knexFile from "../knexfile.js";
const knex = createKnex(knexFile);

export const index = async (_req, res) => {
  try {
    const data = await knex("players").select(
      "id",
      "name",
      "profile_pic",
      "DOB",
      "position"
    );
    res.json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving players: ${err}`);
  }
};

export const singlePlayer = async (req, res) => {
  try {
    const data = await knex("player").where({ id: req.params.id });

    // If record is not found, respond with 404
    if (!data.length) {
      return res
        .status(404)
        .send(`Record with id: ${req.params.id} is not found`);
    }

    // Knex returns an array of records, so we need to send response with a single object only
    res.json(data[0]);
  } catch (err) {
    res.status(400).send(`Error retrieving player ${req.params.id}: ${err}`);
  }
};

export const playerStats = async (req, res) => {
  try {
    const data = await knex("stat").where({ player_id: req.params.id });
    res.json(data);
  } catch (err) {
    res
      .status(400)
      .send(`Error retrieving stats for player ${req.params.id}: ${err}`);
  }
};

export const addPlayer = async (req, res) => {
  // Validate the request body for required data
  if (
    !req.body.name ||
    !req.body.username ||
    !req.body.password ||
    !req.body.date_of_birth ||
    !req.body.email
  ) {
    return res.status(400).send("Please make sure to fill all required fields");
  }

  try {
    const data = await knex("player").insert(req.body);

    // For POST requests we can respond with 201 and the location of the newly created record
    const newplayerURL = `/players/${data[0]}`;
    res.status(201).location(newplayerURL).end(newplayerURL);
  } catch (err) {
    res.status(400).send(`Error creating player: ${err}`);
  }
};

export const updatePlayer = async (req, res) => {
  try {
    await knex("player").update(req.body).where({ id: req.params.id });
    res.send(`Player with id: ${req.params.id} has been updated`);
  } catch (err) {
    res.status(400).send(`Error updating player ${req.params.id}: ${err}`);
  }
};

export const deletePlayer = async (req, res) => {
  try {
    await knex("player").delete().where({ id: req.params.id });
    res.status(204).send(`player with id ${req.params.id} was deleted`);
  } catch (err) {
    res.status(400).send(`Error deleting player ${req.params.id}: ${err}`);
  }
};
