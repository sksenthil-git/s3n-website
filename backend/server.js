const config = require('./config/app.config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: config.FRONTEND_URL,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(config.NODE_ENV === 'development' ? morgan('dev') : morgan('combined'));

// Routes
app.use('/api/contact', require('./routes/contact'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'S3N backend is running',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

// Root
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'S3N Technologies API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', path: req.originalUrl });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
const server = app.listen(config.PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`🚀 S3N Backend running in ${config.NODE_ENV} mode`);
  console.log(`📡 Listening on port ${config.PORT}`);
  console.log(`🔗 Frontend URL: ${config.FRONTEND_URL}`);
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log('📋 Available endpoints:');
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/contact`);
  console.log('');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${config.PORT} is already in use. Try a different PORT in .env`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => { console.log('✅ Process terminated'); });
});

module.exports = app;
