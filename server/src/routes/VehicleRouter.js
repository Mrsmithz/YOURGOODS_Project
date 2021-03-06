const express = require('express')
const router = express.Router()
const VehicleController = require('../controller/VehicleController')
const uploader = require('../uploader/DocumentUploader')
router.post('/addVehicle', uploader.none(), VehicleController.addVehicle)
router.get('/getAllVehicleByManagerId', VehicleController.getAllVehicleByManagerId)
router.put('/editVehicle', uploader.none(), VehicleController.editVehicle)
router.put('/updateVehicleStatus', uploader.none(), VehicleController.updateVehicleStatus)
router.delete('/deleteVehicle/:plate_number', VehicleController.deleteVehicle)
module.exports = router