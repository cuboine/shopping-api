const errors = require('restify-errors')
const Cart = require('../models/Cart')

module.exports = (server) => {
  server.get('/customers/:id/cart', async (req, res, next) => {
    try {
      let cart = await Cart.find({
        customerId: req.params.id
      })
        .populate('customerId')
        .populate('products')

      console.log(cart)
      res.send(cart)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

}
