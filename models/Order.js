const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
