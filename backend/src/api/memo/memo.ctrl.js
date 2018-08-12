const Memo = require('../../db/models/Memo')

exports.getMemo = async (ctx) => {
  const memo = await Memo.find({})
  ctx.body = memo
}

exports.write = async (ctx) => {
  const { username, body } = ctx.request.body
  if (!ctx.request.user) return ctx.status = 401
  Memo.write(username, body)
  ctx.status = 201
}