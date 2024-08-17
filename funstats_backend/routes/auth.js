import express from "express";
import initKnex from "knex";
import knexfile from "../knexfile.js";
const knex = initKnex(knexfile);
import "dotenv/config";
import jwt from "jsonwebtoken";

const router = express.Router();

function authorize(req, res, next) {
  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.player = payload;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
}

router.post("/signup", async (req, res) => {
  const { username, name, password, profile_pic, DOB, position } = req.body;

  if (!username || !name || !password || !DOB || !position) {
    return res.status(400).json({
      message: "Please provide all required information",
    });
  }

  try {
    const data = await knex("players").insert(req.body);
    res.status(201).json("Successfully created player");
  } catch (error) {
    res.status(500).json({ message: `Unable to create player: ${error}` });
  }
  // res.json({ success: "true" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const player = await knex("players").where({ username: username }).first();
  if (!player) {
    return res.status(401).send("Invalid username");
  }
  if (password !== user.password) {
    return res.status(401).send("Invalid password");
  }
  console.log(player);

  const token = jwt.sign(
    {
      id: player.id,
      username: player.username,
      name: player.name,
      age: player.DOB,
      profile_pic: player.profile_pic,
      position: player.position,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );
  res.send(token);
});

router.get("/profile", authorize, (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).send("Please add authorization");
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  const decodedToken = jwt.verify(authToken, JWT_KEY);

  const player = decodedToken.name;
  // res.send(user);

  res.json(player);
  // res.json(req.decoded);
});

export default router;
