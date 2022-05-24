const { Schema, model } = require('mongoose')
const timestamp = require('mongoose')

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    } 
})

sellerSchema.plugin(timestamp)

const Seller = new model('Seller', sellerSchema)
module.exports = Seller