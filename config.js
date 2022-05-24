module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    // 'mongodb+srv://shopping-api:zewmhusiuXg56u6X@shopping-api.pejzz.mongodb.net/?retryWrites=true&w=majority',
    'mongodb://shopping-api:zewmhusiuXg56u6X@shopping-api-shard-00-00.pejzz.mongodb.net:27017,shopping-api-shard-00-01.pejzz.mongodb.net:27017,shopping-api-shard-00-02.pejzz.mongodb.net:27017/?ssl=true&replicaSet=atlas-13aivh-shard-0&authSource=admin&retryWrites=true&w=majority'
}
