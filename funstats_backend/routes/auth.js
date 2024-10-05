import express from "express";
import initKnex from "knex";
import knexfile from "../knexfile.js";
const knex = initKnex(knexfile);
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

function authorize(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_KEY, (err, player) => {
      if (err) return res.sendStatus(403);
      req.player = player;
      next();
    });
  } catch (err) {
    res.sendStatus(401);
  }
}

router.post("/signup", async (req, res) => {
  let { username, name, password, profile_pic, DOB, position } = req.body;

  profile_pic =
    profile_pic ||
    "https://funstats-images.beretesting.com/default_profile_pic.jpg";

  if (!username || !name || !password || !DOB || !position) {
    return res.status(400).json({
      message: "Please provide all required information",
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword;
    const newPlayer = { username, name, password, profile_pic, DOB, position };
    await knex("players").insert(newPlayer);
    res.status(201).json("Successfully created player");
  } catch (error) {
    res.status(500).json({ message: `Unable to create player: ${error}` });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const player = await knex("players").where({ username: username }).first();
  const passwordMatch = await bcrypt.compare(password, player.password);
  if (!player || !passwordMatch) {
    // || password !== player.password
    return res.status(401).send("Invalid username or password");
  }

  const token = jwt.sign(
    {
      id: player.id,
      username: player.username,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );
  res.send({ token: token, id: player.id });
});

router.get("/profile", authorize, async (req, res) => {
  try {
    const player = await knex("players").where({ id: req.player.id }).first();
    if (!player) return res.status(404).json({ error: "Player not found" });

    res.json({
      id: player.id,
      username: player.username,
      profile_pic: player.profile_pic,
      DOB: player.DOB,
      name: player.name,
      position: player.position,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
