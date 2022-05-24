const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config')

const server = restify.createServer()

server.pre(restify.plugins.pre.dedupeSlashes())
server.pre(restify.plugins.pre.sanitizePath())
server.use(restify.plugins.bodyParser())

server.listen(config.PORT, () => {
  try {
    mongoose.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    )
  } catch (err) {
    console.log(err)
  }
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))

db.once('open', () => {
  require('./routes/customers')(server)
  require('./routes/products')(server)
  console.log(`Server started on port ${config.PORT}`)
})
