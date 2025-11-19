import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: true },
  lastLogin: Date,
  isActive: Boolean,
});
const Admin = mongoose.model("Admin", adminSchema, "admin");

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Update lastLogin and isActive
    admin.lastLogin = new Date();
    admin.isActive = true;
    await admin.save();

    // JWT Token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: admin.isAdmin },
      "ishop_secret_key",
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
