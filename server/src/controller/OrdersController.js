const Order = require('../model/Order')

exports.createOrder = async (req, res) => {
    try{
        if (req.session.user.type != 'operator'){
            res.sendStatus(400)
            return
        }
        var data = req.body
        var order = new Order(null, data.company_name, data.receiver_address, data.pickup_address,
            data.invoice_id, data.container_id, data.request_id, req.session.user.id)
        await order.createOrder()
        res.status(201).send(order)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.updateOrderById = async (req, res) => {
    try{
        if (req.session.user.type != 'operator'){
            res.sendStatus(400)
            return
        }
        var id = req.params.id
        var data = req.body
        var order = new Order()
        await order.updateOrderById(id, data.company_name, data.receiver_address, data.pickup_address,
            data.invoice_id, data.container_id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.deleteOrderById = async (req, res) => {
    try{
        if (req.session.user.type != 'operator'){
            res.sendStatus(400)
            return
        }
        var id = req.params.id
        var order = new Order()
        await order.deleteOrderById(id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getOrdersByRequsetId = async (req, res) => {
    try{
        var order = new Order()
        let result = await order.getOrdersByRequestId(req.params.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
exports.getOrdersByOperator = async (req, res) => {
    try{
        if (req.session.user.type != 'operator'){
            res.sendStatus(400)
            return
        }
        var id = req.session.user.id
        var order = new Order()
        let result = await order.getOrdersByOperator(id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
exports.getOrderById = async (req, res) => {
    try{
        var id = req.params.id
        var order = new Order()
        let result = await order.getOrdersById(id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
exports.getOrdersHistoryByCustomer = async (req, res) => {
    try{
        try{
            var order = new Order()
            let result = await order.getOrdersHistoryByCustomer(req.session.user.id)
            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.sendStatus(404)
        }
    }
    catch(err){

    }
}