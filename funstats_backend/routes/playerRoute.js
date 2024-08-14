import express from "express";
import * as playerController from "../controllers/playerController.js";

const router = express.Router();

router.route("/:id").get(playerController.singlePlayer);
router.route("/:id/stats").get(playerController.playerStatAggregates);

export default router;
