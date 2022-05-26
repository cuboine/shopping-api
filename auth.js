const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const User = mongoose.model('User')

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      reject('Must have email and password')
    }

    try {
      const user = await User.findOne({ email })

      // match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err)
        }
        if (isMatch) {
          resolve(user)
        } else {
          reject('Password did not match')
        }
      })

    } catch (err) {
      reject('Email does not exist')
    }
  })
}
