const Customer = require('../model/Customer')
const Supervisor = require('../model/Supervisor')
const OrderManager = require('../model/OrderManager')
const Messenger = require('../model/Messenger')
const Authorization = require('../model/Authorization')
exports.customerRegister = async (req, res) => {
    var data = req.body
    var customer = new Customer(null, data.username, data.password, null, data.name, data.email, data.tel, data.address)
    try{
        try{
            await customer.checkIfUsernameDuplicate()
            await customer.checkIfEmailDuplicate()
        }
        catch(err){
            res.status(200).send(err)
            return
        }
        var user_result = await customer.createUser()
        customer.setAccountId(user_result.insertId)
        var customer_result = await customer.createCustomerAccount()
        customer.setCustomerId(customer_result.insertId)
        res.status(201).send(customer)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.supervisorRegister = async (req, res) => {
    var data = req.body
    if (data.secret_key === 'doggo'){
        var supervisor = new Supervisor(null, data.username, data.password, null, data.name, data.email, data.tel, data.gender, data.address)
        try{
            try {
                await supervisor.checkIfUsernameDuplicate()
                await supervisor.checkIfEmailDuplicate()
            }
            catch (err){
                res.status(200).send(err)
                return
            }
            var user_result = await supervisor.createUser()
            supervisor.setAccountId(user_result.insertId)
            var staff_result = await supervisor.createStaffAccount()
            supervisor.setStaffId(staff_result.insertId)
            await supervisor.createSupervisorAccount()
            res.status(201).send(supervisor)
        }
        catch(err){
            console.log(err)
            res.sendStatus(400)
        }
    }
    else{
        res.status(200).send('secret key did not match')
    }
}
exports.orderManagerRegister = async (req, res) => {
    var data = req.body
    var order_manager = new OrderManager(null, data.username, data.password, null, data.name, data.email, data.tel, data.gender, data.address,
        data.supervisor_id)
    try{
        try {
            await order_manager.checkIfUsernameDuplicate()
            await order_manager.checkIfEmailDuplicate()
            await order_manager.checkSupervirsorId()
        }
        catch (err){
            res.status(200).send(err)
            return
        }
        var user_result = await order_manager.createUser()
        order_manager.setAccountId(user_result.insertId)
        var staff_result = await order_manager.createStaffAccount()
        order_manager.setStaffId(staff_result.insertId)
        await order_manager.createOrderManagerAccount()
        res.status(201).send(order_manager)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.messengerRegister = async (req, res) => {
    var data = req.body
    var messenger = new Messenger(null, data.username, data.password, null, data.name, data.email, data.tel, data.gender, data.address,
        data.vehicle_id, data.order_manager_id)
    try{
        try{
            await messenger.checkIfUsernameDuplicate()
            await messenger.checkIfEmailDuplicate()
            await messenger.checkOrderManagerId()
        }
        catch(err){
            res.status(200).send(err)
            return
        }
        var user_result = await messenger.createUser()
        messenger.setAccountId(user_result.insertId)
        var staff_result =await messenger.createStaffAccount()
        messenger.setStaffId(staff_result.insertId)
        await messenger.createMessengerAccount()
        res.status(201).send(messenger)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.checkRegisterRoute = async (req, res, next) => {
    try{
        var data = req.body
        var result = await Authorization.checkRegisterRoute(data.register_type)
        req.url = result
        next()
    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}
