const config = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET
}

module.exports = config
