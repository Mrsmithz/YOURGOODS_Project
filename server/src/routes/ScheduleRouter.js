const express = require('express')
const router = express.Router()
const ScheduleController = require('../controller/ScheduleController')
const uploader = require('../uploader/DocumentUploader')

router.post('/createSchedule', uploader.none(), ScheduleController.createSchedule)
router.get('/getByOrder/:id', ScheduleController.getScheduleByOrder)
router.get('/getById/:id', ScheduleController.getScheduleById)
module.exports = router
