const express = require('express')
const router = express.Router()
const uploader = require('../uploader/DocumentUploader')
const LocationController = require('../controller/LocationController')
router.post('/addLocation', uploader.none(), LocationController.addLocation)
router.get('/getLocationByOrderId/:id', LocationController.getLocationByOrderId)
module.exports = router
