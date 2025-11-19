import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Contact from "../models/Contact.js";

const router = express.Router();

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password)
      return res.status(400).json({ message: "Invalid email or password" });

    admin.lastLogin = new Date();
    admin.isActive = true;
    await admin.save();

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

// ✅ Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a message
router.delete("/messages/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    await Contact.findByIdAndDelete(messageId);
    res.json({ success: true, message: "Message deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Mark message as read
router.patch("/messages/:id/read", async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Contact.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Dashboard counts
router.get("/counts", async (req, res) => {
  try {
    const [productCount, messageCount, adminCount] = await Promise.all([
      Product.countDocuments(),
      Contact.countDocuments(),
      Admin.countDocuments(),
    ]);
    res.json({ productCount, messageCount, adminCount });
  } catch (err) {
    console.error("Error fetching counts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
