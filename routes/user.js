// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, checkRole } = require('../middleware/auth');

// Получить всех пользователей (только для админа)
router.get('/', auth, checkRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // убираем пароль
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});

module.exports = router;
