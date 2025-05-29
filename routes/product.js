const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const getNextSequence = require('../utils/getNextSequence');
const mongoose = require('mongoose');


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('user', 'email'); // если нужно имя/email владельца
    if (!product) return res.status(404).json({ message: 'Товар не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить все товары (с фильтрами)
router.get('/', async (req, res) => {
  try {
    const { category, user, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (user) filter.user = user;
    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // поиск по имени (регистронезависимый)
    }

    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('user', 'username');
      
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить товар
router.post('/', auth, async (req, res) => {
  try {
    const nextId = await getNextSequence('product');
    const categoryId = new mongoose.Types.ObjectId(req.body.category);

    const product = new Product({
      ...req.body,
      productId: nextId,
      user: req.user.id,
      category: new mongoose.Types.ObjectId(req.body.category)
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить товар
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Товар не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Удалить товар
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Товар не найден' });
    res.json({ message: 'Товар удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
