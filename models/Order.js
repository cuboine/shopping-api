const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  }
  // checkedOut: {
  //   type: Boolean,
  //   default: false
  // }
})

orderSchema.index({ customerId: 1 })
orderSchema.plugin(timestamp)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
