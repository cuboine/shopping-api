const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['customer', 'seller']
  }
})

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ type: 1 })
userSchema.plugin(timestamp)

const User = mongoose.model('User', userSchema)
module.exports = User
