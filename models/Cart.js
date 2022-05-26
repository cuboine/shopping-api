const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
})

cartSchema.index({ customerId: 1 }, { unique: true })

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
