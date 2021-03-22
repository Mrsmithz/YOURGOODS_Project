const express = require('express')
const router = express.Router()
const OrdersController = require('../controller/OrdersController')

router.post('/create', OrdersController.createOrder)
router.get('/getAll/customer', OrdersController.getAllOrderByCustomer)
router.get('/getAll/messenger', OrdersController.getAllOrderByMessenger)
router.post('/edit/customer/:order_id', OrdersController.editOrderReceiverByCustomer)
router.post('/delete/:order_id', OrdersController.deleteOrder)

router.get('/get/customer/:order_id', OrdersController.getOrderByCustomer)
router.get('/get/messenger/:order_id', OrdersController.getOrderByMessenger)
module.exports = router
