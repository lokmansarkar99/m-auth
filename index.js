import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // Required for cookies
  })
);
app.use(cookieParser());

// DATABASE
connectDB();

// HEALTH CHECK
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Auth API with ES6 Modules & JWT Cookies',
    version: '2.0.0',
    features: ['ES6 Modules', 'Access & Refresh Tokens', 'HTTP-Only Cookies', 'Modular Architecture'],
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      logout: 'POST /api/auth/logout',
      refresh: 'POST /api/auth/refresh',
      profile: 'GET /api/auth/profile',
      users: 'GET /api/users?page=1&limit=10',
    },
  });
});

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ERROR HANDLERS
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔒 Cookies Enabled: Access & Refresh Tokens`);
});

export default app;
