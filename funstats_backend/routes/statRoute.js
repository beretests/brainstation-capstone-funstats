import express from "express";
import * as statController from "../controllers/statController.js";

const router = express.Router();

router.route("/").get(statController.singleStat);
router.route("/seasons").get(statController.getSeasons);

export default router;
