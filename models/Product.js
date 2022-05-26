const { Schema, model } = require('mongoose')
const timestamp = require('mongoose-timestamp')

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Seller'
  },
  description: {
    type: String
  }
})

productSchema.plugin(timestamp)

const Product = model('Product', productSchema)
module.exports = Product
