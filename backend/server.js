import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fileRoutes from "./routes/file.js";
import sharingRoutes from "./routes/sharing.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.DATABASE_URL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..............................."))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes); 
app.use("/api/sharing", sharingRoutes);


app.get("/get", (req, res) => {
  res.send("Backend is running with models!");
  console.log("done");
});


const PORT = 2000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
