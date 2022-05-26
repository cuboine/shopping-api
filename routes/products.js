const errors = require('restify-errors')
const Product = require('../models/Product.js')

module.exports = (server) => {
  // get product
  server.get('/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id)
      res.send(product)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find a \`Product\` with id of ${req.params.id}`))
    }
  })

  // get all products
  server.get('/products', async (req, res, next) => {
    try {
      const products = await Product.find()
      res.send(products)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  // update product
  server.put('/products/:id', async (req, res, next) => {
    // check for json
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError())
    }

    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
      )
      res.send(200, product)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  // // delete one product
  // server.del('/products/:id', async (req, res, next) => {
  //   try {
  //     const product = Product.findOneAndDelete({ _id: req.params.id })
  //     res.send(204)
  //     return next()
  //   } catch (err) {
  //     return next(new errors.ResourceNotFoundError(`Could not find a \`Product\` with id ${req.params.id}`))
  //   }
  // })
}
