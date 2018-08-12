const mongoose = require('mongoose')
const { Schema } = mongoose
const Memo = new Schema({
  username: { type: String },
  body: { type: String },
  created: { type: Date, default: new Date() }
})

Memo.statics.write = async function (username, body) {
  const user = new this({ username, body })
  return user.save()
}

module.exports = mongoose.model('Memo', Memo)