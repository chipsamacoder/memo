const Router = require('koa-router')

const router = new Router()
const auth = require('./auth.ctrl')

router.post('/', auth.create)
router.get('/', auth.users)
router.post('/login', auth.login)
router.post('/logout', auth.logout)

module.exports = router