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
            var stmt2 = 'select * from SCHEDULE where id = ?'
            let [rows, fields] = await conn.query(stmt2, [this.id])
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
    async getScheduleById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select s.*, u1.name as shipping_name, u2.name as transport_name, u3.name as driver_name, v.plate_number as plate_number\
            from SCHEDULE as s \
            join USER as u1 \
            on u1.id = s.shipping_id \
            join USER as u2 \
            on u2.id = s.transport_id \
            left join USER as u3 \
            on u3.id = s.driver_id \
            left join VEHICLE as v \
            on v.plate_number = s.vehicle_plate_number \
            where s.id = ?'
            //var stmt2 = 'select name from USER where id in (select * from SCHEDULE where id = ?)'
            let [rows, fields] = await conn.query(stmt, [id])
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
    static async getTransportId(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            // var stmt = 'select request_count, sub.id from \
            // (select COUNT(c.operator_id) as request_count, u.id as id from CUSTOMER_OPERATOR as c \
            // left join USER as u\
            // on u.id = c.operator_id and u.type = \'operator\' \
            // group by u.id) as sub'
            var stmt = 'select count(s.transport_id) as request_count, u.id from USER as u \
            left join SCHEDULE as s \
            on u.id = s.transport_id where u.type = \'transport\' \
            group by u.id'
            let [rows, field] = await conn.query(stmt)
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
    static async getShippingId(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            // var stmt = 'select request_count, sub.id from \
            // (select COUNT(c.operator_id) as request_count, u.id as id from CUSTOMER_OPERATOR as c \
            // left join USER as u\
            // on u.id = c.operator_id and u.type = \'operator\' \
            // group by u.id) as sub'
            var stmt = 'select count(s.transport_id) as request_count, u.id from USER as u \
            left join SCHEDULE as s \
            on u.id = s.shipping_id where u.type = \'shipping\' \
            group by u.id'
            let [rows, field] = await conn.query(stmt)
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
}

module.exports = Schedule
