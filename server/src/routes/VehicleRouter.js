const express = require('express')
const router = express.Router()
const VehicleController = require('../controller/VehicleController')
const uploader = require('../uploader/DocumentUploader')
router.post('/addVehicle', uploader.none(), VehicleController.addVehicle)
router.get('/getAllVehicleByManagerId', VehicleController.getAllVehicleByManagerId)
module.exports = router