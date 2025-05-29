const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getNextSequence = require('../utils/getNextSequence');

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Проверка на существующего пользователя
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким именем или email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nextId = await getNextSequence('user');

    const newUser = new User({
      userId: nextId,
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'Пользователь создан', userId: nextId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Логин
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token, user: { id: user._id, username: user.username, role: user.role  } });
});

module.exports = router;
