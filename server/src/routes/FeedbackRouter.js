const express = require('express')
const router = express.Router()
const FeedbackController = require('../controller/FeedbackController')
router.post('/createFeedback', FeedbackController.createFeedback)
router.get('/getLatestFeedback', FeedbackController.getLatestFeedback)
module.exports = router