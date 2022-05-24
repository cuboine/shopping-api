const errors = require('restify-errors')
const Customer = require('../models/Customer')

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

  // get all customers
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find()
      res.send(customers)
      next()
    } catch (err) {
      return next(new errors.IvalidContentError(err))
    }
  })

  // add a customer
  server.post('/customers', async (req, res, next) => {
    // if (!req.is('application/json')) {
    //   return next(new errors.InvalidContentError("Expected 'application/json'"))
    // }
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

  // update customer
  server.put('/customers/:id', async (req, res, next) => {
    // if (!req.is('application/json')) {
    //   return next(new errors.InvalidContentError("Expected 'application/json'"))
    // }

    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res.send(200, customer)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`))
    }
  })

  // delete a customer
  server.del('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: req.params.id })
      res.send(204)
      return next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`))
    }
  })
}
