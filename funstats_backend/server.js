import "dotenv/config";
import cors from "cors";
import express from "express";
import statRoutes from "./routes/statRoute.js";
import playerRoutes from "./routes/playerRoute.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());
app.get("/", (_req, res) => {
  res.send("Welcome to FunStats API");
});

app.use("/players", playerRoutes);
app.use("/stats", statRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
