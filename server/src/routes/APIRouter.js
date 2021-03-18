const express = require('express')
const router = express.Router()
const User = require('../model/User')
const RegisterController = require('../controller/RegisterController')
router.post('/login', async (req, res) => {
    var user = new User(null, req.body.username, req.body.password)
    try{
        await user.getUserId()
        var json_string = JSON.stringify(await user.login())
        var data = JSON.parse(json_string)[0]
        console.log(data)
    }
    catch(err) {
        console.log(err)
    }
})
router.post('/register/customer', RegisterController.customerRegister)
router.post('/register/staff/supervisor', RegisterController.supervisorRegister)
router.post('/register/staff/order_manager', RegisterController.orderManagerRegister)
router.post('/register/staff/messenger', RegisterController.messengerRegister)
module.exports = router
