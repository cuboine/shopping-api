require('dotenv').config()

const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config')
const rjwt = require('restify-jwt-community')

const server = restify.createServer()

server.pre(restify.plugins.pre.dedupeSlashes())
server.pre(restify.plugins.pre.sanitizePath())
server.use(restify.plugins.bodyParser())

server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/register', '/login'] }))

server.listen(config.PORT, () => {
  try {
    mongoose.connect(config.MONGODB_URI)
  } catch (err) {
    console.log(err)
  }
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))

db.once('open', () => {
  require('./routes/users')(server)
  require('./routes/cart')(server)
  require('./routes/customers')(server)
  require('./routes/products')(server)
  require('./routes/seller.js')(server)
  console.log(`Server started on port ${config.PORT}`)
})
