const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Orders{
    constructor(id, cust_id, messenger_id, arrived_datetime, receiver, send_datetime, cost, created_datetime){
        this.order_id = id
        this.customer_id = cust_id
        this.messenger_staff_id = messenger_id
        this.arrived_datetime = arrived_datetime
        this.order_receiver = receiver
        this.send_datetime = send_datetime
        this.order_cost = cost
        this.created_datetime = created_datetime
    }
    async createOrder(){
        var stmt = 'insert into Orders(customer_id, messenger_staff_id, order_receiver, order_cost) \
        values(?,?,?,?)'
        return await mysql_query(stmt, [this.customer_id, this.messenger_staff_id, this.order_receiver, this.order_cost])
    }
    async getAllOrdersByCustomer(customer_id){
        var stmt = 'select * from Orders where customer_id = ?'
        return await mysql_query(stmt, [customer_id])
    }
    async getAllOrdersByMessenger(messenger_id){
        var stmt = 'select * from Orders where messenger_staff_id = ?'
        return await mysql_query(stmt, [messenger_id])
    }
    async editOrderReceiverByCustomer(order_id, customer_id, receiver){
        var stmt = 'update Orders set order_receiver = ? where order_id = ? and customer_id = ?'
        return await mysql_query(stmt, [receiver, order_id, customer_id])
    }
    async deleteOrder(order_id, customer_id){
        var stmt = 'delete from Orders where order_id = ? and customer_id = ?'
        return await mysql_query(stmt, [order_id, customer_id])
    }
    async getOrderByCustomer(order_id, customer_id){
        var stmt = 'select * from Orders where order_id = ? and customer_id = ?'
        return await mysql_query(stmt, [order_id, customer_id])
    }
    async getOrderByMessenger(order_id, messenger_id){
        var stmt = 'select * from Orders where order_id = ? and messenger_staff_id = ?'
        return await mysql_query(stmt, [order_id, messenger_id])
    }
    getOderId(){
        return this.order_id
    }
    setOrderId(id){
        this.order_id = id
    }
}

module.exports = Orders
