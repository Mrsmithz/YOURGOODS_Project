const express = require('express')
const router = express.Router()
const GoodsController = require('../controller/GoodsController')

router.post('/create', GoodsController.createGoods)
router.put('/edit/:id', GoodsController.editGoods)
router.get('/by/id/:id', GoodsController.getGoodsById)
router.get('/by/order/:id', GoodsController.getAllGoodsByOrderId)
router.delete('/by/id/:id', GoodsController.deleteGoodsById)
router.delete('/by/order/:id', GoodsController.deleteGoodsByOrderId)

module.exports = router
