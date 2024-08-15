import createKnex from "knex";
import knexFile from "../knexfile.js";
const knex = createKnex(knexFile);

export const singlePlayer = async (req, res) => {
  try {
    const data = await knex("players")
      .where({ id: req.params.id })
      .select("id", "name", "profile_pic", "DOB", "position");
    res.json(data[0]);
  } catch (err) {
    res.status(400).send(`Error retrieving player ${req.params.id}: ${err}`);
  }
};

export const playerStatAggregates = async (req, res) => {
  try {
    const data = await knex("stats")
      .where({ player_id: req.params.id })
      .sum({
        goals_scored: "goals_scored",
        assists: "assists",
        shots_on_target: "shots_on_target",
        tackles: "tackles",
        interceptions: "interceptions",
        saves: "saves",
        yellow_cards: "yellow_cards",
        red_cards: "red_cards",
        fouls: "fouls",
        headers_won: "headers_won",
        offsides: "offsides",
      })
      .first();

    // If record is not found, respond with 404
    if (!data) {
      return res
        .status(404)
        .send(`Player id: ${req.params.id} has no stats added yet.`);
    }

    res.json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving stat: ${err}`);
  }
};

export const addStat = async (req, res) => {
  const { date, game, player_id } = req.body;

  if (!date || !game || !player_id) {
    return res.status(400).json({
      message: "Please provide all required information",
    });
  }

  try {
    const data = await knex("stats").insert(req.body);
    // const newStat = await knex("stats").select("username").where({ id: data[0] });
    res.status(201).json("Successfully created stat");
  } catch (error) {
    res.status(500).json({ message: `Unable to create stat: ${error}` });
  }
};

export const addPlayer = async (req, res) => {
  const { username, name, password, DOB, position } = req.body;

  if (!username || !name || !password || !DOB || !position) {
    return res.status(400).json({
      message: "Please provide all required information",
    });
  }

  try {
    const data = await knex("players").insert(req.body);
    // const newStat = await knex("stats").where({ id: data[0] });
    res.status(201).json("Successfully created player");
  } catch (error) {
    res.status(500).json({ message: `Unable to create player: ${error}` });
  }
};

export const updatePlayer = async (req, res) => {
  // const { name, DOB, position, profile_pic } = req.body;

  // if ( !name   || !DOB || !position) {
  //   return res.status(400).json({
  //     message: "Please provide all required information",
  //   });
  // }

  try {
    const data = await knex("players")
      .where({ id: req.params.id })
      .update(req.body);
    // const newStat = await knex("stats").where({ id: data[0] });
    res.status(204).json("Successfully updated player");
  } catch (error) {
    res.status(500).json({ message: `Unable to update player: ${error}` });
  }
};
