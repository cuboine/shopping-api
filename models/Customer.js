const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Field name required.' ],
    trim: true
  },
  email: {
    type: String,
    required: [ true, 'Field email required.' ],
    trim: true,
  },
  balance: {
    type: Number,
    default: 0
  }
})

customerSchema.plugin(timestamp)

const Customer = new mongoose.model('Customer', customerSchema)
module.exports = Customer
