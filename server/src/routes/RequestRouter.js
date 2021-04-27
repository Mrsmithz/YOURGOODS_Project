const express = require('express')
const router = express.Router()
const RequestController = require('../controller/RequestController')
const DocumentUploader = require('../uploader/DocumentUploader')

router.post('/createRequest', DocumentUploader.single('document'), RequestController.createRequest)
router.get('/getRequestById/:id', RequestController.getRequestById)
router.get('/getAllRequestByCustomerId', RequestController.getAllRequestByCustomerId)
router.get('/getAllRequestByOperatorId', RequestController.getAllRequestByOperatorId)
router.delete('/deleteRequestById/:id', RequestController.deleteRequestById)
router.put('/editRequest/:id', DocumentUploader.single('document'), RequestController.editRequest)
router.put('/updateStatus/:id', DocumentUploader.none(), RequestController.updateRequestStatus)
module.exports = router
