import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { File } from "../models/file.js";

dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { originalname: name, mimetype: type, size } = file;
    const fileKey = `${Date.now()}-${name}`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: type,
    };

    const s3Response = await s3.upload(uploadParams).promise();

    
    const savedFile = new File({
      owner: "unknown", 
      name,
      s3Url: s3Response.Location,
      size,
      type,
    });

    await savedFile.save();

    res.status(201).json({
      message: "File uploaded successfully.",
      file: {
        name,
        size,
        type,
        url: s3Response.Location,
        uploadDate: savedFile.createdAt,
      },
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "An error occurred while uploading the file." });
  }
});

export default router;
