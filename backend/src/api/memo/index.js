const Router = require('koa-router')

const router = new Router()
const memo = require('./memo.ctrl')

router.get('/', memo.getMemo)
router.post('/', memo.write)

module.exports = router