const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  dateofbirth: {
    type: Date,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'user',
  },
})

const user = mongoose.model('User', registerSchema)
//exporting
module.exports = user
