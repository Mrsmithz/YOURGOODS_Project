const express = require('express')
const router = express.Router()
const OrdersController = require('../controller/OrdersController')

router.post('/create', OrdersController.createOrder)
router.put('/edit/:id', OrdersController.updateOrderById)
router.get('/get/customer/:id', OrdersController.getOrdersByCustomer)
router.get('/get/operator/:id')
module.exports = router
