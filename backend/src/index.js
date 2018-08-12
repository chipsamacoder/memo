require('dotenv').config()
const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const bodyParser = require('koa-body')
const { PORT: port } = process.env
require('./db').connect()
const app = new Koa()
const router = new Router()
require('./lib/cors')(app)
const jwtMiddleware = require('./middleware/jwt')
app.use(logger())
app.use(jwtMiddleware)
app.use(bodyParser({
  formidable: { uploadDir: './uploads' },
  multipart: true,
  urlencoded: { limit: '50mb', extended: true }
}))
const api = require('./api')
router.use('/api', api.routes())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`API server is listening to port ${port}`)
})
