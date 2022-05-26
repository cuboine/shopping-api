const errors = require('restify-errors')
const Cart = require('../models/Cart')
const Order = require('../models/Order')

module.exports = (server) => {
  server.get('/customers/:id/cart', async (req, res, next) => {
    try {
      let cart = await Cart.find({
        customerId: req.params.id
      })
        .populate('customerId')
        .populate('products')

      res.send(cart)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.post('/customers/:id/cart/checkout', async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
        customerId: req.params.id
      }).populate('products')

      let requests = []
      for (let product of cart.products) {
        const order = new Order({
          customerId: req.params.id,
          productId: product._id,
          sellerId: product.sellerId
        })

        requests.push(new Promise(async (resolve, reject) => {
          try {
            await order.save()
            resolve(order)
          } catch (err) {
            reject(err)
          }
        }))
      }

      const values = await Promise.all(requests)
        .catch((err) => {
          return next(new errors.InternalError(err))
        })

      res.send(200)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(err))
    }
  })
}
