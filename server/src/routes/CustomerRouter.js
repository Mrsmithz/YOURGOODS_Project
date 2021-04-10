const express = require('express')
const router = express.Router()
const CustomerController = require('../controller/CustomerController')
const DocumentUploader = require('../uploader/DocumentUploader')

router.post('/createRequest', DocumentUploader.single('document'), CustomerController.createRequest)
module.exports = router
