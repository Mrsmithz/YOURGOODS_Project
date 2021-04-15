const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')

router.put('/update/profile', UserController.updateUserProfile)
router.post('/update/password', UserController.updateUserPassword)

module.exports = router
