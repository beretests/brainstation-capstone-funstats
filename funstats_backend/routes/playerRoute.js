import express from "express";
import * as playerController from "../controllers/playerController.js";

const router = express.Router();

router
  .route("/:id")
  .get(playerController.singlePlayer)
  .patch(playerController.updatePlayer);

router.route("/:id/stats").get(playerController.playerStatAggregates);
router.route("/:id/stats/add").post(playerController.addStat);
router.route("/:id/stats/compare/:friendId").get(playerController.compareStat);
router.route("/add").post(playerController.addPlayer);

router
  .route("/:id/friends")
  .get(playerController.getFriends)
  .post(playerController.addFriend);

// router.route("/:id/friends/stats").get(playerController.getFriendStats);
export default router;
