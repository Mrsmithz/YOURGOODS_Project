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
            await conn.commit()
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
    async getScheduleByDriver(driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from SCHEDULE where driver_id = ?'
            let [rows, fields] = await conn.query(stmt, [driver_id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getScheduleByTransport(transport_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from SCHEDULE where transport_id = ?'
            let [rows, fields] = await conn.query(stmt, [transport_id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getScheduleByShipping(shipping_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from SCHEDULE where shipping_id = ?'
            let [rows, fields] = await conn.query(stmt, [shipping_id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getScheduleByOrder(order_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from SCHEDULE where order_id = ?'
            let [rows, fields] = await conn.query(stmt, [order_id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async editSchedule(id, pickup_datetime, arrived_datetime, driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update SCHEDULE set pickup_datetime = ?, arrived_datetime = ?, driver_id = ? where id = ?'
            let result = await conn.query(stmt, [pickup_datetime, arrived_datetime, driver_id, id])
            await conn.commit()
            return Promise.resolve(result)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async deleteSchedule(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'delete from SCHEDULE where id = ?'
            let result = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(result)
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
