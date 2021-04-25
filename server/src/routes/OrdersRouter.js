const express = require('express')
const router = express.Router()
const OrdersController = require('../controller/OrdersController')

router.post('/create', OrdersController.createOrder)
router.put('/edit/:id', OrdersController.updateOrderById)
router.get('/get/customer', OrdersController.getOrdersByCustomer)
router.get('/get/operator', OrdersController.getOrdersByOperator)
router.get('/get/:id', OrdersController.getOrderById)
router.delete('/delete/:id', OrdersController.deleteOrderById)
module.exports = router
