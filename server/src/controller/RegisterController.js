const Customer = require('../model/Customer')
const Supervisor = require('../model/Supervisor')
const OrderManager = require('../model/OrderManager')
const Messenger = require('../model/Messenger')
const Authorization = require('../model/Authorization')
exports.customerRegister = async (req, res) => {
    var data = req.body
    var customer = new Customer(null, data.username, data.password, null, data.name, data.email, data.tel, data.address)
    try{
        await customer.checkIfEmailDuplicate()
        await customer.createUser()
        await customer.getUserId()
        await customer.createCustomerAccount()
        await customer.getCustomerId()
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
            await supervisor.checkIfEmailDuplicate()
            await supervisor.createUser()
            await supervisor.getUserId()
            await supervisor.createStaffAccount()
            await supervisor.getStaffId()
            await supervisor.createSupervisorAccount()
            res.status(201).send(supervisor)
        }
        catch(err){
            console.log(err)
            res.sendStatus(400)
        }
    }
    else{
        res.sendStatus(400)
    }
}
exports.orderManagerRegister = async (req, res) => {
    var data = req.body
    var order_manager = new OrderManager(null, data.username, data.password, null, data.name, data.email, data.tel, data.gender, data.address,
        data.supervisor_id)
    try{
        await order_manager.checkIfEmailDuplicate()
        await order_manager.checkSupervirsorId()
        await order_manager.createUser()
        await order_manager.getUserId()
        await order_manager.createStaffAccount()
        await order_manager.getStaffId()
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
        await messenger.checkIfEmailDuplicate()
        await messenger.checkOrderManagerId()
        await messenger.createUser()
        await messenger.getUserId()
        await messenger.createStaffAccount()
        await messenger.getStaffId()
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
        var result = await Authorization.checkRegisterRoute(data.register_type, data.secret_key)
        req.url = result
        next()
    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}
