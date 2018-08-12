const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  created: { type: Date, default: new Date() }
})

User.statics.create = async function (username, password) {
  const user = new this({ username, password })
  return user.save()
}

module.exports = mongoose.model('User', User)