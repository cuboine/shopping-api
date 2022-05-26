const { Schema, model } = require('mongoose')
const timestamp = require('mongoose-timestamp')

const sellerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  }
})

sellerSchema.plugin(timestamp)

const Seller = model('Seller', sellerSchema)
module.exports = Seller
