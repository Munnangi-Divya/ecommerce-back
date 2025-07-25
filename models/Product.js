const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, },
  price: { type: Number, required: true },
  countInStock: { type: Number, },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

 



module.exports = mongoose.model('Product', productSchema);
