const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const uploader = require('../uploader/DocumentUploader')

router.post('/register', uploader.none(), UserController.createAccount)

router.post('/login', uploader.none(), UserController.userLogin)
router.get('/get/session', UserController.getSession)
router.get('/logout', UserController.destroySession)
module.exports = router
