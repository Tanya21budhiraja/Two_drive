import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fileRoutes from "./routes/file.js";
import sharingRoutes from "./routes/sharing.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
const mongoURI =
  "mongodb+srv://tanya1442be21:tanya@cluster0.3gocx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() =>
    console.log("Connected to MongoDB...............................")
  )
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Use Routes
app.use("/api/users", userRoutes); // Set up the user routes
app.use("/api/files", fileRoutes); // Set up the file routes
app.use("/api/sharing", sharingRoutes); // Set up the sharing routes

// Base Route
app.get("/get", (req, res) => {
  res.send("Backend is running with models!");
  console.log("done");
});

// Start the backend server
const PORT = 2000;
app.listen(PORT, () =>
  console.log(`Backend server running on http://localhost:${PORT}`)
);
