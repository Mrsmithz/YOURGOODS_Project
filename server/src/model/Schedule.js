const pool = require('../database/mysql_connector')

class Schedule{
    constructor(id, pickup_datetime, arrived_datetime, driver_id, transport_id, order_id, shipping_id, vehicle_plate_number){
        this.id = id
        this.pickup_datetime = pickup_datetime
        this.arrived_datetime = arrived_datetime
        this.driver_id = driver_id
        this.transport_id = transport_id
        this.order_id = order_id
        this.shipping_id = shipping_id
        this.vehicle_plate_number = vehicle_plate_number
    }
}

module.exports = Schedule
