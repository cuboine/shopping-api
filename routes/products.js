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


  /* seller -> products */
  // get all products by seller
  server.get('/sellers/:id/products', async (req, res, next) => {
    try {
      const products = await Product.find({
        sellerId: req.params.id
      }).populate('sellerId')

      res.send(products)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
    }
  })

  // add product
  server.post('/sellers/:id/products', async (req, res, next) => {
    // check for json
    if (!req.is('application/json')) {
        return next(new errors.InvalidContentError())
    }

    const { name, price } = req.body
    const product = new Product({
      name,
      price,
      sellerId: req.params.id,
    })

    try {
      await product.save()
      res.send(201, product)
      return next()
    } catch (error) {
      return next(new errors.BadRequestError(error.message))
    }
  })

  // get a single product by the seller
  server.get('/seller/:id/product/:productId', async (req, res, next) => {
    try {
      const product = await Product.find({
        _id: req.params.productId,
        sellerId: req.params.id
      }).populate('sellerId')

      res.send(product)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(err))
    }
  })
}
