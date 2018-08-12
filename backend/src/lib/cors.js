module.exports = (app) => {
  app.use((ctx, next) => {
    const allowedHosts = [
      'http://127.0.0.1:2000',
      'http://127.0.0.1:3000',
    ]
    const origin = ctx.header['origin']
    allowedHosts.every(el => {
      if (!origin) return false
      if (origin.indexOf(el) !== -1) {
        ctx.response.set('Access-Control-Allow-Origin', origin)
        return false
      }
      return true
    })
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept, x-timebase, Link')
    ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
    ctx.set('Access-Control-Expose-Headers', 'Link')
    return next()
  })
}
