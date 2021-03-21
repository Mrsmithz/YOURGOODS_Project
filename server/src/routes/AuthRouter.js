const express = require('express')
const router = express.Router()
const RegisterController = require('../controller/RegisterController')
const LoginController = require('../controller/LoginController')
router.post('/login', LoginController.checkLoginRoute)
router.post('/login/customer', LoginController.customerLogin)
router.post('/login/supervisor', LoginController.supervisorLogin)
router.post('/login/order_manager', LoginController.orderManagerLogin)
router.post('/login/messenger', LoginController.messengerLogin)

router.post('/register', RegisterController.checkRegisterRoute)
router.post('/register/customer', RegisterController.customerRegister)
router.post('/register/supervisor', RegisterController.supervisorRegister)
router.post('/register/order_manager', RegisterController.orderManagerRegister)
router.post('/register/messenger', RegisterController.messengerRegister)

router.post('/login/session', LoginController.getSession)
module.exports = router
