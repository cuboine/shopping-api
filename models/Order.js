const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  // checkedOut: {
  //   type: Boolean,
  //   default: false
  // }
})

orderSchema.plugin(timestamp)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
