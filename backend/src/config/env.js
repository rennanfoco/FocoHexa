require('dotenv').config();

if (!process.env.OPENROUTER_API_KEY) {
  console.error('OPENROUTER_API_KEY nao definida no .env');
  process.exit(1);
}

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};