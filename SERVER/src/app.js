import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import authRoutes
from "./routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("SkillStacker API Running 🚀");
});

export default app;