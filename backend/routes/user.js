import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);

  // Check for exisitng email

  // if email doesnot exists pleae make account

  // if account ecists comapre passwords

  // if password match

  // generate jwt token to authorize user and keep him signed in

  // set jwt token in cookie (brower autoamtically sends cookies)
});

router.post("/register", async (req, res) => {
  try {
    // Check for exisitng email

    // if email doesnot exists save user to db

    // generate jwt token to authorize user and keep him signed in

    // set jwt token in cookie (brower autoamtically sends cookies)

    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send("User register");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
