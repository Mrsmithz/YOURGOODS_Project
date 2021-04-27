const express = require('express')
const router = express.Router()
const ContactsController = require('../controller/ContactsController')
const uploader = require('../uploader/DocumentUploader')
router.post('/sendMessage', uploader.none(), ContactsController.sendMessage)
router.post('/getMessageBySender', uploader.none(), ContactsController.getMessageBySender)
router.post('/getMessageByReceiver', uploader.none(), ContactsController.getMessageByReceiver)
router.put('/updateMessageStatus', uploader.none(), ContactsController.updateMessageStatusByReceiver)
router.get('/getName/:id', ContactsController.getNameById)
router.get('/getUnReadMessageByReceiver', ContactsController.getUnReadMessageByReceiver)


module.exports = router
