const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.create)
router.get('/items/:id', basketController.getAll)
router.get('/:id', basketController.destroy)

module.exports = router