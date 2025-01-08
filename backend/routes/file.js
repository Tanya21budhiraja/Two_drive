// routes/upload.js

import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";
import { File } from "../models/file.js";

dotenv.config();
const router = express.Router();

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

// Multer for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload API
router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileKey = `${Date.now()}-${req.file.originalname}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const s3Response = await s3.upload(uploadParams).promise();

    const file = new File({
      owner: req.user.id,
      name: req.file.originalname,
      s3Url: s3Response.Location,
      size: req.file.size,
      type: req.file.mimetype,
    });

    await file.save();

    res.status(201).json({
      message: "File uploaded successfully",
      fileUrl: s3Response.Location,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

export default router;
