import createKnex from "knex";
import knexFile from "../knexfile.js";
const knex = createKnex(knexFile);

// export const addStat = async (req, res) => {
//   // Validate the request body for required data
//   if (
//     !req.body.goals_scored ||
//     !req.body.assists ||
//     !req.body.shots_on_target ||
//     !req.body.tackles ||
//     !req.body.interceptions ||
//     !req.body.saves ||
//     !req.body.yellow_cards ||
//     !req.body.red_cards ||
//     !req.body.fouls ||
//     !req.body.headers_won ||
//     !req.body.offsides
//   ) {
//     return res.status(400).send("Please make sure to fill all required fields");
//   }

//   try {
//     const data = await knex("player").insert(req.body);

//     // For POST requests we can respond with 201 and the location of the newly created record
//     const newplayerURL = `/players/${data[0]}`;
//     res.status(201).location(newplayerURL).end(newplayerURL);
//   } catch (err) {
//     res.status(400).send(`Error creating player: ${err}`);
//   }
// };

export const singleStat = async (req, res) => {
  try {
    const data = await knex("stat").where({ player_id: req.params.id });

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

// export const statAggregates = async (req, res) => {
//   try {
//     const data = await knex('stats')
//     .where({ player_id: req.params.id })
//     .sum({
//       goals_scored: 'goals_scored',
//       assists: 'assists',
//       shots_on_target: 'shots_on_target',
//       tackles: 'tackles',
//       interceptions: 'interceptions',
//       saves: 'saves',
//       yellow_cards: 'yellow_cards',
//       red_cards: 'red_cards',
//       fouls: 'fouls',
//       headers_won: 'headers_won',
//       offsides: 'offsides',
//     })
//     .first();;

//     // If record is not found, respond with 404
//     if (!data.length) {
//       return res
//         .status(404)
//         .send(`Stat with id: ${req.params.id} is not found`);
//     }

//     // Knex returns an array of records, so we need to send response with a single object only
//     res.json(data[0]);
//   } catch (err) {
//     res.status(400).send(`Error retrieving stat ${req.params.id}: ${err}`);
//   }
// };
