const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
