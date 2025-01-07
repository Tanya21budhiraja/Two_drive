import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";
import { File } from "../models/file.js";

dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1", // Replace with your AWS region
});

// Upload File Route
router.post("/upload", async (req, res) => {
  try {
    const { owner, name, size, type, fileBuffer } = req.body;

    if (!owner || !name || !size || !type || !fileBuffer) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const fileKey = `${Date.now()}-${name}`;
    const buffer = Buffer.from(fileBuffer, "base64");

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: type,
    };

    const s3Response = await s3.upload(uploadParams).promise();

    // Save File Info to MongoDB
    const file = new File({
      owner,
      name,
      s3Url: s3Response.Location,
      size,
      type,
    });

    await file.save();

    res.status(201).json(file);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
