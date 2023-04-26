require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-token',
  DB_URL: process.env.DB_URL ?? 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT: process.env.PORT ?? 3000,
}