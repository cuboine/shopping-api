const mongoose = require('mongoose')
const errors = require('restify-errors')

const Order = require('../models/Order')
const Product = require('../models/Product')
const Seller = require('../models/Seller')

module.exports = (server) => {
  // get seller
  server.get('/seller/:id', async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id)
      res.send(seller)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
    }
  })

  // update seller
  server.put('/seller/:id', async (req, res, next) => {
    try {
      const seller = await Seller.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res.send(200, seller)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
    }
  })

  // get all sellers
  server.get('/sellers', async (req, res, next) => {
    try {
      const sellers = await Seller.find()
      res.send(sellers)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  // add a seller
  server.post('/sellers', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Needs to be 'application/json'"))
    }

    const { name, userId } = req.body
    const seller = new Seller({
      name,
      userId
    })

    try {
      await seller.save()
      res.send(201, seller)
      return next()
    } catch (err) {
      return next(new errors.InternalError(err.message))
    }
  })

  // get list of orders received by seller
  server.get('/seller/:id/orders', async (req, res, next) => {
    try {
      const orders = await Order.find({ userId: req.params.id })
      res.send(orders)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
    }
  })

  // get all products by seller
  server.get('/seller/:id/products', async (req, res, next) => {
    try {
      const products = await Product.find({ sellerId: req.params.id })
      res.send(products)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
    }
  })

  // add product
  server.post('/seller/:id/products', async (req, res, next) => {
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
      })
      res.send(product)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(err))
    }
  })

  // update a product
  server.put('/seller/:id/product/:productId', async (req, res, next) => {
    try {
      const product = await Product.findOneAndUpdate({
        _id: req.params.productId,
        sellerId: req.params.id
      }, req.body, { new: true })

      res.send(200, product)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(err.message))
    }
  })

  // // delete seller
  // server.del('/seller/:id', async (req, res, next) => {
  //   try {
  //     await Seller.findOneAndDelete(
  //       { _id: req.params.id },
  //       req.body
  //     )
  //     res.send(204)
  //     return next()
  //   } catch (err) {
  //     return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
  //   }
  // })
}
