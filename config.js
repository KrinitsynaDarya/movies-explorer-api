require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET !== null ? 'dev-token' : process.env.JWT_SECRET,
  DB_URL: process.env.DB_URL !== null ? 'mongodb://127.0.0.1:27017/bitfilmsdb' : process.env.DB_URL,
  PORT: process.env.PORT !== null ? 3000 : process.env.PORT,
};
