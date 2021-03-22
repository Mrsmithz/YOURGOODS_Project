const Customer = require('../model/Customer')
const Supervisor = require('../model/Supervisor')
const OrderManager = require('../model/OrderManager')
const Messenger = require('../model/Messenger')
const redisClient = require('../redis_cache/redis_client')
const Authorization = require('../model/Authorization')
exports.customerLogin = async (req, res) => {
    try{
        var data = req.body
        var customer = new Customer(null, data.username, data.password)
        await customer.getUserId()
        await customer.getUserData()
        await customer.getCustomerData()
        req.session.user_data = JSON.parse(JSON.stringify(customer))
        res.status(200).send(customer)
    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.supervisorLogin = async (req, res) => {
    try{
        var data = req.body
        var supervisor = new Supervisor(null, data.username, data.password)
        await supervisor.getUserId()
        await supervisor.getUserData()
        await supervisor.getSupervirsorData()
        req.session.user_data = JSON.parse(JSON.stringify(supervisor))
        res.status(200).send(supervisor)
    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.orderManagerLogin = async (req, res) => {
    try{
        var data = req.body
        var orderManager = new OrderManager(null, data.username, data.password)
        await orderManager.getUserId()
        await orderManager.getUserData()
        await orderManager.getOrderManagerData()
        req.session.user_data = JSON.parse(JSON.stringify(orderManager))
        res.status(200).send(orderManager)
    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.messengerLogin = async (req, res) => {
    try{
        var data = req.body
        var messenger = new Messenger(null, data.username, data.password)
        await messenger.getUserId()
        await messenger.getUserData()
        await messenger.getMessengerData()
        req.session.user_data = JSON.parse(JSON.stringify(messenger))
        res.status(200).send(messenger)

    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.checkLoginRoute = async (req, res, next) => {
    try{
        var data = req.body
        var result = await Authorization.checkLoginRoute(data.username)
        req.url = result
        next()
    }
    catch (err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.getSession = async (req, res) => {
    if (req.session.user_data){
        console.log(`${req.session.user_data.account_username} has session`)
        res.status(200).send(req.session.user_data)
    }
    else{
        res.sendStatus(404)
    }
}
