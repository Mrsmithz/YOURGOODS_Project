const express = require('express')
const router = express.Router()
const ContactsController = require('../controller/ContactsController')

router.post('/send/:receiver_id', ContactsController.createContacts)
router.get('/get/sender/:sender_id', ContactsController.getAllContactsBySender)
router.get('/get/receiver/:receiver_id', ContactsController.getAllContactsByReceiver)
module.exports = router
