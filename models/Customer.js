const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  }
})

customerSchema.index({ userId: 1 }, { unique: true })
customerSchema.plugin(timestamp)

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer
