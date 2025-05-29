const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const getNextSequence = require('../utils/getNextSequence');


// Получить все категории
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Добавить категорию
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: 'Такая категория уже существует' });
    }

    const nextId = await getNextSequence('category');

    const newCategory = new Category({
      categoryId: nextId,
      name
    });

    await newCategory.save();
    res.status(201).json({ message: 'Категория добавлена', categoryId: nextId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Удалить категорию по categoryId
router.delete('/:id',  async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    res.json({ message: 'Категория удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
});



module.exports = router;
