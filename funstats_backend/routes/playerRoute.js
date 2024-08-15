import express from "express";
import * as playerController from "../controllers/playerController.js";

const router = express.Router();

router
  .route("/:id")
  .get(playerController.singlePlayer)
  .patch(playerController.updatePlayer);

router.route("/:id/stats").get(playerController.playerStatAggregates);
router.route("/:id/stats/add").post(playerController.addStat);
router.route("/add").post(playerController.addPlayer);

export default router;
