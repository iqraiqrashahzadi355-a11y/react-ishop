const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// ✅ Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Add product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ message: 'Product added', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
