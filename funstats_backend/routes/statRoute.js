import express from "express";
import * as statController from "../controllers/statController.js";

const router = express.Router();

router.route("/").get(statController.singleStat);

export default router;
