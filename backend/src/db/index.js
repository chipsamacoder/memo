require('dotenv').config()
const { MONGO_URI: mongoURI } = process.env
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const connection = mongoose.connect(mongoURI, { useNewUrlParser: true })

module.exports = (function () {
  mongoose.Promise = global.Promise
  return {
    connect () {
      return connection.then(() => {
        console.info('Successfully connected to mongodb')
      }).catch(e => {
        console.error(e)
      })
    },
    disconnect () {
      return mongoose.disconnect()
    }
  }
})()
