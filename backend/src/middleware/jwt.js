const { generateToken, decodeToken } = require('../lib/token')

module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('token')
  if (!token) {
    ctx.request.user = null
    return next()
  }

  try {
    const decoded = await decodeToken(token)
    const { user } = decoded
    // re-issue token when its age is over 3 days
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24 * 3) {
      const freshToken = await generateToken({ user }, 'user')
      ctx.cookies.set('token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
    }
    console.log(user)
    ctx.request.user = user
  } catch (e) {
    console.log(e)
    ctx.request.user = null
  }
  return next()
}
