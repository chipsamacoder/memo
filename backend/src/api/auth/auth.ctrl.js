const Joi = require('joi')
const User = require('../../db/models/User')
const { generateToken } = require('../../lib/token')

exports.users = async (ctx) => {
  const users = await User.find({})
  ctx.body = users
}

exports.loginByToken = async (ctx) => {
  const { token } = ctx.request.body
  const user = await User.findOne({token})
  if (user.password === password) {
    let token = await generateToken({ user: { username } }, 'user')
    ctx.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    ctx.status = 200
  } else {
    ctx.status = 400
  }
}

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await User.findOne({username})
  if (user) {
    if (user.password === password) {
      let token = await generateToken({ user: { username } }, 'user')
      ctx.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      ctx.status = 200
    } else {
      ctx.status = 400
    }
  } else {
    ctx.status = 400
  }
}

exports.logout = async (ctx) => {
  await ctx.cookies.set('token', null, {
    maxAge: 0,
    httpOnly: true
  })
  ctx.status = 204
}

exports.create = async (ctx) => {
  const body = ctx.request.body
  const schema = Joi.object({
    username: Joi.string().regex(/^[ㄱ-힣]{2,12}$/).required(),
    password: Joi.string().min(8).max(30)
  })
  const result = Joi.validate(body, schema)

  // Schema Error
  if (result.error) {
    console.log(result.error)
    ctx.status = 400
    ctx.body = result.error
    return
  }
  let { username, password } = body
  try {
    User.create(username, password)
    ctx.status = 201
  } catch (error) {
    console.log(error)
    ctx.status = 500
  }
}