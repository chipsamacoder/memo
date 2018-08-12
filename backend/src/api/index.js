const Router = require('koa-router')
const api = new Router()
const auth = require('./auth')
const memo = require('./memo')

api.use('/auth', auth.routes())
api.use('/memo', memo.routes())

module.exports = api
