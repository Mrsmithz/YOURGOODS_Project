const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')


router.post('/register', UserController.createAccount)

router.post('/login', UserController.userLogin)
router.get('/get/session', UserController.getSession)
router.get('/logout', UserController.destroySession)
router.put('/update/user/profile/:id', UserController.updateUserProfile)
router.post('/update/user/password/:id', UserController.updateUserPassword)
module.exports = router
