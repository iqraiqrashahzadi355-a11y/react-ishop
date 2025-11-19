// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/ishop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ DB Error:", err));

// ✅ Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
app.get("/", (req, res) => {
  res.send("🚀 iShop Backend is running successfully!");
});
