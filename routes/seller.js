const errors = require('restify-errors')

const Order = require('../models/Order')
const Seller = require('../models/Seller')

module.exports = (server) => {
  // get seller
  server.get('/sellers/:id', async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id)
      res.send(seller)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Could not find seller with id of ${req.params.id}`))
    }
  })

  // update seller
  server.put('/sellers/:id', async (req, res, next) => {
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
      const sellers = await Seller.find().populate('userId')
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

  /* seller -> orders */
  // get list of orders received by seller
  server.get('/sellers/:id/orders', async (req, res, next) => {
    try {
      const orders = await Order.find({
        'productId.sellerId': req.params.id
      })
        .populate('customerId')
        .populate('productId')
      res.send(orders)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err.message))
    }
  })
}
