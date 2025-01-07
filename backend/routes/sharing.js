import express from "express";
import { Access } from "../models/share.js";

const router = express.Router();

router.post("/share", async (req, res) => {
  try {
    const { file, sharedWith, permissions } = req.body;
    const sharing = new Access({ file, sharedWith, permissions });
    await sharing.save();
    res.status(201).json(sharing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
