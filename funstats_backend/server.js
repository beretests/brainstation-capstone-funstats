import "dotenv/config";
import cors from "cors";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto";
import express from "express";
import statRoutes from "./routes/statRoute.js";
import playerRoutes from "./routes/playerRoute.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5050;
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

app.use(express.json());
app.use(cors());
app.get("/", (_req, res) => {
  res.send("Welcome to FunStats API");
});

app.use("/", authRoutes);
app.use("/player", playerRoutes);
app.use("/stats", statRoutes);

app.post("/player/add/upload", async (req, res) => {
  const { contentLength } = req.body;
  if (contentLength > FILE_SIZE_LIMIT) {
    return res.status(400).json({ error: "File size too large" });
  }

  const bucketKey = randomBytes(16).toString("hex");
  const signedUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: bucketKey,
      ContentLength: contentLength,
    }),
    { expiresIn: 30 }
  );

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${bucketKey}`;
  res.json({ signedUrl, publicUrl });
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
