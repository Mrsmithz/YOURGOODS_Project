const express = require('express')
const router = express.Router()
const CustomerController = require('../controller/CustomerController')
const DocumentUploader = require('../uploader/DocumentUploader')

router.post('/createRequest', DocumentUploader.single('document'), CustomerController.createRequest)
router.get('/getRequestById/:id', CustomerController.getRequestById)
router.get('/getAllRequestByCustomerId', CustomerController.getAllRequestByCustomerId)
router.delete('/deleteRequestById/:id', CustomerController.deleteRequestById)
router.put('/editRequest/:id', CustomerController.editRequest)
module.exports = router
