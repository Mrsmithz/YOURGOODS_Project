const express = require('express')
const router = express.Router()
const OrdersController = require('../controller/OrdersController')
const uploader = require('../uploader/DocumentUploader')

router.post('/create', uploader.none(), OrdersController.createOrder)
router.put('/edit/:id', uploader.none(), OrdersController.updateOrderById)
router.get('/get/request/:id', OrdersController.getOrdersByRequsetId)
router.get('/get/operator', OrdersController.getOrdersByOperator)
router.get('/get/:id', OrdersController.getOrderById)
router.delete('/delete/:id', OrdersController.deleteOrderById)
router.get('/get/history/customer', OrdersController.getOrdersHistoryByCustomer)
module.exports = router
