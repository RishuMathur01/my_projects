const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: String,
  imageUrl: String,
  category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
