const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')

router.put('/update/profile', UserController.updateUserProfile)
router.post('/update/password', UserController.updateUserPassword)
router.put('/update/email', UserController.updateUserEmail)
router.get('/getStaffDetail', UserController.getStaffDetail)
module.exports = router
