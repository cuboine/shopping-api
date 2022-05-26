const errors = require('restify-errors')

const Cart = require('../models/Cart')
const Customer = require('../models/Customer')
const Product = require('../models/Product')

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

  server.post('/products/:id/add-to-cart', async (req, res, next) => {
    const userId = req.user._id
    try {
      // get customerId with req.user._id
      const customer = await Customer.findOne({ userId }, '_id')

      // add to cart
      try {
        const cart = await Cart.findOne({ customerId: customer._id })
        const product = await Product.findById(req.params.id)

        cart.products.push(product)
        await cart.save()
        res.send(200, { message: `Product ${product.name} added to cart -> Customer ${customer._id}` })
      } catch (err) {
        return next(new errors.InternalError(err))
      }

    } catch (err) {
      return next(new errors.InternalError(err))
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
