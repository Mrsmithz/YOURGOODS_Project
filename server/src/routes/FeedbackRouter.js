const express = require('express')
const router = express.Router()
const FeedbackController = require('../controller/FeedbackController')
const uploader = require('../uploader/DocumentUploader')
router.post('/createFeedback', uploader.none(), FeedbackController.createFeedback)
router.get('/getLatestFeedback', FeedbackController.getLatestFeedback)
module.exports = router