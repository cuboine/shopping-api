const errors = require('restify-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Cart = require('../models/Cart')
const Customer = require('../models/Customer')
const Seller = require('../models/Seller')
const User = require('../models/User')

const auth = require('../auth')
const config = require('../config')

module.exports = (server) => {

  // here we create the User,
  // Customer (and Cart),
  // or Seller instances
  server.post('/register', async (req, res, next) => {
    const { email, password } = req.body
    const user = new User({
      email,
      password
    })

    // salt and hash password
    bcrypt.hash(user.password, 10, async (err, hash) => {
      if (err) {
        console.log('bcrypt:', err)
      }

      if (!req.body.type) {
        return next(new errors.BadRequestError('Must include account \`type\`'))
      }

      // set hashed password
      user.password = hash
      try {
        // save user
        await user.save()
        console.log(`User document created for ${user.email}`)

        // create user type
        if (req.body.type === 'customer') {

          // create customer
          const { firstName, lastName } = req.body
          const customer = new Customer({
            userId: user._id,
            firstName,
            lastName
          })

          try {
            await customer.save()
            console.log(`Customer document created for ${user.email}`)
          } catch (err) {
            return next(new errors.BadRequestError(err.message))
          }

          // create cart for customer
          const cart = new Cart({ customerId: customer._id })
          try {
            await cart.save()
            console.log(`Cart document created for ${user.email}`)
          } catch (err) {
            return next(new errors.InternalError(err.message))
          }

        } else if (req.body.type === 'seller') {
          const { name } = req.body
          const seller = new Seller({
            userId: user._id,
            name
          })
          try {
            await seller.save()
            console.log(`Seller document created for ${user.email}`)
          } catch (err) {
            return next(new errors.BadRequestError(err.message))
          }
        }

        res.send(201, { message: 'Account creation successful' })
        return next()

      } catch (err) {
        return next(new errors.BadRequestError(err.message))
      }
    })
  })

  server.post('/login', async (req, res, next) => {
    // authenticate the User
    // and return their token
    const { email, password } = req.body

    try {
      const user = await auth.authenticate(email, password)

      // create token
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '30m'
      })

      // issued_at, expiry
      const { iat, exp } = jwt.decode(token)
      res.send({ iat, exp, token })

      return next()
    } catch (err) {
      return next(new errors.UnauthorizedError(err))
    }
  })

}
