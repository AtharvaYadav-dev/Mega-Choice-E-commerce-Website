import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// Config
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const CLIENT_URL = process.env.CLIENT_URL || '';
const CLIENT_URLS = (process.env.CLIENT_URLS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_URL_REGEX = process.env.CLIENT_URL_REGEX ? new RegExp(process.env.CLIENT_URL_REGEX) : null;

// Middleware
app.use(
  cors({
    origin(origin, cb) {
      // Allow server-to-server, curl, health checks (no origin)
      if (!origin) return cb(null, true);
      // Allow explicit list
      if (CLIENT_URL && origin === CLIENT_URL) return cb(null, true);
      if (CLIENT_URLS.length && CLIENT_URLS.includes(origin)) return cb(null, true);
      // Allow regex match if provided (e.g., preview deployments)
      if (CLIENT_URL_REGEX && CLIENT_URL_REGEX.test(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Basic health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('Warning: MONGODB_URI is not set. Server will start without DB connection.');
    } else {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
