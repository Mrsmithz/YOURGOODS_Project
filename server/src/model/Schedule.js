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
    async createSchedule(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into SCHEDULE (pickup_datetime, arrived_datetime, driver_id, transport_id, order_id, shipping_id, vehicle_plate_number) \
            values(?,?,?,?,?,?,?)'
            let result = await conn.query(stmt, [this.pickup_datetime, this.arrived_datetime, this.driver_id,
            this.transport_id, this.order_id, this.shipping_id, this.vehicle_plate_number])
            this.id = result[0].insertId
            return Promise.resolve(this.id)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
}

module.exports = Schedule
