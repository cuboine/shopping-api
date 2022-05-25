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
  }
})

userSchema.plugin(timestamp)

const User = mongoose.model('User', userSchema)
module.exports = User
