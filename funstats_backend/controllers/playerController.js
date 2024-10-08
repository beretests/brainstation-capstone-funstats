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
      .join("players", "stats.player_id", "=", "players.id")
      .select("players.name", "players.profile_pic", "players.id")
      .where({ player_id: req.params.id, "stats.season": req.params.season })
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
      .groupBy("players.name", "players.profile_pic", "players.id");

    if (!data) {
      return res
        .status(404)
        .send(
          `Player id: ${req.params.id} has no stats added yet for season ${req.params.season}.`
        );
    }

    res.json(data[0]);
  } catch (err) {
    res.status(400).send(`Error retrieving stats: ${err}`);
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
    res.status(201).json("Successfully created stat");
  } catch (error) {
    res.status(500).json({ message: `Unable to create stat: ${error}` });
  }
};

// export const addPlayer = async (req, res) => {
//   const { username, name, password, DOB, position } = req.body;

//   const newPlayer = {
//     username,
//     name,
//     password,
//     DOB,
//     position,
//     profile_pic:
//       "https://funstats-images.beretesting.com/default_profile_pic.jpg",
//   };

//   try {
//     await knex("players").insert(newPlayer);
//     res.status(201).json("Successfully added new player");
//   } catch (error) {
//     res.status(500).json({ message: `Unable to create player: ${error}` });
//   }
// };

export const updatePlayer = async (req, res) => {
  try {
    await knex("players").where({ id: req.params.id }).update(req.body);
    res.status(204).json("Successfully updated player");
  } catch (error) {
    res.status(500).json({ message: `Unable to update player: ${error}` });
  }
};

export const compareStat = async (req, res) => {
  try {
    const stats = await knex("stats")
      .join("players", "stats.player_id", "=", "players.id")
      .select("players.name", "players.profile_pic", "players.id")
      .where({ player_id: req.params.id, season: req.params.season })
      .orWhere({
        player_id: req.params.friendId,
        season: req.params.season,
      })
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
      .groupBy("players.name", "players.profile_pic", "players.id");
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: `Unable to get stats: ${error}` });
  }
};

export const getFriends = async (req, res) => {
  try {
    const data = await knex("friendship")
      .select(
        "players.id",
        "players.username",
        "players.name",
        "players.profile_pic",
        "players.DOB",
        "players.position"
      )
      .join("players", function () {
        this.on(function () {
          this.on("players.id", "=", "friendship.player1_id")
            .andOn("player2_id", "=", knex.raw("?", [req.params.id]))
            .orOn("players.id", "=", "friendship.player2_id")
            .andOn("player1_id", "=", knex.raw("?", [req.params.id]));
        });
      })
      .where({ player1_id: req.params.id })
      .orWhere({ player2_id: req.params.id });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Unable to get friends: ${error}` });
  }
};

export const addFriend = async (req, res) => {
  const { username } = req.body;

  try {
    const friend = await knex("players")
      .select("id")
      .where("username", "=", username);
    console.log(friend);
    const [player1_id, player2_id] = [friend[0].id, req.params.id].sort();

    await knex("friendship").insert({ player1_id, player2_id });
    res.status(201).json(friend);
  } catch (error) {
    res.status(500).json({ message: `Unable to add friend: ${error}` });
  }
};

export const removeFriend = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Please provide your friend's username",
    });
  }

  try {
    const friend = await knex("players")
      .select("id")
      .where("username", username);

    const [player1_id, player2_id] = [friend[0].id, req.params.id].sort();

    const deletedFriendship = await knex("friendship")
      .where({ player1_id, player2_id })
      .del();

    if (deletedFriendship) {
      res.status(200).json(`Successfully removed friend - ${username}`);
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to remove friend: ${error}` });
  }
};
