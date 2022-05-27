const errors = require('restify-errors')

const Customer = require('../models/Customer')
const Order = require('../models/Order')

module.exports = (server) => {
  // get a single customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id)
      res.send(customer)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`))
    }
  })

  // get all customers (todo: limit for admins)
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find().populate('userId')
      res.send(customers)
      next()
    } catch (err) {
      return next(new errors.IvalidContentError(err))
    }
  })

  // add a customer (*currently unused code, customer gets created at user creation)
  server.post('/customers', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expected 'application/json'"))
    }
    const { name, email, balance } = req.body
    const customer = new Customer({
      name,
      email,
      balance
    })
    try {
      await customer.save()
      res.send(201, customer)
      next()
    } catch (error) {
      return next(new errors.BadRequestError(error.message))
    }
  })

  /* customer -> orders */
  // get list of orders received by seller
  server.get('/customers/:id/orders', async (req, res, next) => {
    if (req.user.type === 'seller') {
      return next(new errors.ForbiddenError('Not Allowed'))
    }

    try {
      const orders = await Order.find({
        customerId: req.params.id
      }).populate('productId')

      res.send(orders)
      return next()
    } catch (err) {
      return next(new errors.InvalidContentError(err.message))
    }
  })

}
