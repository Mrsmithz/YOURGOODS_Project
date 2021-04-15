const Order = require('../model/Order')

exports.createOrder = async (req, res) => {
    try{
        var data = req.body
        var order = new Order(null, data.company_name, data.receiver_address, data.pickup_address,
            data.invoice_id, data.container_id, data.customer_id, data.operator_id)
        await order.createOrder()
        res.send(order)
    }
    catch(err){
        console.log(err)
    }
}
exports.updateOrderById = async (req, res) => {
    try{
        var id = req.params.id
        var data = req.body
        var order = new Order()
        await order.updateOrderById(id, data.company_name, data.receiver_address, data.pickup_address,
            data.invoice_id, data.container_id)
    }
    catch(err){
        console.log(err)
    }
}
exports.getOrdersByCustomer = async (req, res) => {
    try{
        var id = req.session.user.id
        var order = new Order()
        let result = await order.getOrdersByCustomer(id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(404)
    }
}
