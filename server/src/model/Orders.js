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
}

module.exports = Orders
