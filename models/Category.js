const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryId: { type: Number, unique: true },
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Category', categorySchema);
