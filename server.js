const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


// Route imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Product = require('./models/Product');

// Optional: only run once
const addInitialProducts = async () => {
  const existing = await Product.find();
  if (existing.length > 0) return console.log('🟡 Products already exist, skipping seed.');


  const products = [
    {
      name: 'Nike Air Max 90',
      category: 'Running',
      price: 6999,
      countInStock: 10,
      rating: 4.6,
      image: 'https://static.nike.com/a/images/t_default/3c1f8b0c-4d2e-4a5f-9b6d-7f8e1c5b0a2c/air-max-90-mens-shoes-3Xjz9N.png',
      description: 'Classic design with maximum comfort and visible Air cushioning for all-day wear.'
    },
    {
      name: 'Adidas Ultraboost 22',
      category: 'Running',
      price: 8499,
      countInStock: 8,
      rating: 4.8,
      image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/30c3e5a493ef42dcb6ccac74010f8f5f_9366/Ultraboost_Light_Shoes_Black_GW6125_01_standard.jpg',
      description: 'Premium cushioning and responsive performance for runners and casual wear.'
    },
    {
      name: 'Puma Flyer Runner',
      category: 'Training',
      price: 2599,
      countInStock: 15,
      rating: 4.3,
      image: 'https://in.puma.com/media/catalog/product/3/7/377037_12.jpeg',
      description: 'Lightweight training shoes with sleek design and breathable mesh upper.'
    },
    {
      name: 'ASICS Gel-Kayano 29',
      category: 'Running',
      price: 9999,
      countInStock: 7,
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/61F7aklYvuL._SY695_.jpg',
      description: 'Long-distance running shoes with FlyteFoam cushioning and GEL technology.'
    }
  ];

  try {
    await Product.insertMany(products);
    console.log('✅ Initial products added to DB');
  } catch (error) {
    console.error('❌ Error adding products:', error.message);
  }
};


// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('eCommerce API is running...');
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
