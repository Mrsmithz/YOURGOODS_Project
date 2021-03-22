const Orders = require('../model/Orders')
exports.createOrder = async (req, res) => {
    try{
        var data = req.body
        var order = new Orders(null, data.customer_id, data.messenger_id, null, data.receiver, null, data.cost)
        var result = await order.createOrder()
        order.setOrderId(result.insertId)
        res.status(201).send(order)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getAllOrderByMessenger = async (req, res) => {
    try{
        var data = req.body
        var order = new Orders()
        var result = await order.getAllOrdersByMessenger(data.messenger_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
exports.getAllOrderByCustomer = async (req, res) => {
    try{
        var data = req.body
        var order = new Orders()
        var result = await order.getAllOrdersByCustomer(data.customer_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
exports.editOrderReceiverByCustomer = async (req, res) => {
    try{
        var data = req.body
        var id = req.params.order_id
        var order = new Orders()
        var result = await order.editOrderReceiverByCustomer(id, data.customer_id, data.receiver)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.deleteOrder = async (req, res) => {
    try{
        var data = req.body
        var id = req.params.order_id
        var order = new Orders()
        await order.deleteOrder(id, data.customer_id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getOrderByCustomer = async (req, res) => {
    try{
        var id = req.params.order_id
        var data = req.body
        var order = new Orders()
        var result = await order.getOrderByCustomer(id, data.customer_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
exports.getOrderByMessenger = async (req, res, next) => {
    try{
        var id = req.params.order_id
        var data = req.body
        var order = new Orders()
        var result = await order.getOrderByMessenger(id, data.messenger_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
