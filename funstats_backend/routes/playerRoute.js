import express from "express";
import * as playerController from "../controllers/playerController.js";

const router = express.Router();

router.route("/:id").get(playerController.singlePlayer);

export default router;
