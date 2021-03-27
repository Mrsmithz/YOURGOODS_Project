const express = require('express')
const router = express.Router()
const RegisterController = require('../controller/RegisterController')
const LoginController = require('../controller/LoginController')


router.post('/register', RegisterController.createAccount)

router.post('/login', LoginController.userLogin)
router.get('/get/session', LoginController.getSession)

router.put('/update/user/profile/:id', RegisterController.updateUserProfile)
router.post('/update/user/password/:id', RegisterController.updateUserPassword)
module.exports = router
