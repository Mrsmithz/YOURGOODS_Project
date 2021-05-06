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
    static async editPickupSchedule(id, pickup_datetime){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update SCHEDULE set pickup_datetime = ? where id = ?'
            let result = await conn.query(stmt, [pickup_datetime, id])
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
            var stmt = 'select count(s.shipping_id) as request_count, u.id from USER as u \
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
    static async getScheduleInProgressDetail(transport_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select s.*, o.id as order_id, u.name as operator_name, u1.name as driver_name, cus.name as customer_name \
            from SCHEDULE as s \
            join ORDERS as o \
            on o.id = s.order_id \
            join CUSTOMER_OPERATOR as co \
            on o.request_id = co.id \
            join USER as cus \
            on co.customer_id = cus.id \
            join USER as u \
            on u.id = o.operator_id and u.type = \'operator\' \
            left join USER as u1 \
            on u1.id = s.driver_id \
            left join VEHICLE as v \
            on v.plate_number = s.vehicle_plate_number \
            where s.transport_id = ? and co.status = \'in progress\''
            let [rows, field] = await conn.query(stmt, [transport_id])
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
    static async getScheduleCompletedDetail(transport_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select s.*, o.id as order_id, u.name as operator_name, u1.name as driver_name, cus.name as customer_name \
            from SCHEDULE as s \
            join ORDERS as o \
            on o.id = s.order_id \
            join CUSTOMER_OPERATOR as co \
            on o.request_id = co.id \
            join USER as cus \
            on co.customer_id = cus.id \
            join USER as u \
            on u.id = o.operator_id and u.type = \'operator\' \
            join USER as u1 \
            on u1.id = s.driver_id \
            join VEHICLE as v \
            on v.plate_number = s.vehicle_plate_number \
            where s.transport_id = ? and co.status = \'completed\''
            let [rows, field] = await conn.query(stmt, [transport_id])
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
    static async getScheduleInProgressDetailByDriver(driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select s.*, o.id as order_id, u.name as operator_name, u1.name as driver_name, cus.name as customer_name, co.status as status, co.id as request_id \
            from SCHEDULE as s \
            join ORDERS as o \
            on o.id = s.order_id \
            join CUSTOMER_OPERATOR as co \
            on o.request_id = co.id \
            join USER as cus \
            on co.customer_id = cus.id \
            join USER as u \
            on u.id = o.operator_id and u.type = \'operator\' \
            left join USER as u1 \
            on u1.id = s.driver_id \
            left join VEHICLE as v \
            on v.plate_number = s.vehicle_plate_number \
            where s.driver_id = ? and co.status = \'in progress\''
            let [rows, field] = await conn.query(stmt, [driver_id])
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
    static async getScheduleCompletedDetailByDriver(driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select s.*, o.id as order_id, u.name as operator_name, u1.name as driver_name, cus.name as customer_name, co.status as status, co.id as request_id \
            from SCHEDULE as s \
            join ORDERS as o \
            on o.id = s.order_id \
            join CUSTOMER_OPERATOR as co \
            on o.request_id = co.id \
            join USER as cus \
            on co.customer_id = cus.id \
            join USER as u \
            on u.id = o.operator_id and u.type = \'operator\' \
            join USER as u1 \
            on u1.id = s.driver_id \
            join VEHICLE as v \
            on v.plate_number = s.vehicle_plate_number \
            where s.driver_id = ? and co.status = \'completed\''
            let [rows, field] = await conn.query(stmt, [driver_id])
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
    static async getAllDriver(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from USER where type = \'driver\''
            let [rows, fields] = await conn.query(stmt)
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
    static async updateScheduleDriver(id, driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update SCHEDULE set driver_id = ? where id = ?'
            let result = await conn.query(stmt, [driver_id, id])
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
    static async updateScheduleVehicle(id, plate_number){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update SCHEDULE set vehicle_plate_number = ? where id = ?'
            let result = await conn.query(stmt, [plate_number, id])
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
    static async updateScheduleStatus(schedule_id, request_id, arrived_datetime, status){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update CUSTOMER_OPERATOR set status = ? where id = ?'
            var stmt2 = 'update SCHEDULE set arrived_datetime = ? where id = ?'
            await conn.query(stmt, [status, request_id])
            let result = await conn.query(stmt2, [arrived_datetime, schedule_id])
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

    static async getDriverDetail(driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            let stmt = 'select count(status) as `count_status`, u.id, c.status, u.name from USER as u \
            join `SCHEDULE` as s \
            on s.driver_id = u.id \
            join ORDERS as o \
            on o.id = s.order_id \
            join CUSTOMER_OPERATOR as c \
            on c.id = o.request_id and (c.status = \'completed\' or c.status = \'in progress\') \
            where u.id = ? \
            group by status \
            order by status'
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
    static async getOperatorDetail(operator_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            let stmt = 'select count(status) as `count_status`, u.id, c.status, u.name from USER as u \
            join ORDERS as o \
            on o.operator_id = u.id \
            join CUSTOMER_OPERATOR as c \
            on c.id = o.request_id \
            where u.id = ? \
            group by status \
            order by status'
            let [rows, fields] = await conn.query(stmt, [operator_id])
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
    static async getTransportDetail(transport_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select count(status) as `count_status`, u.id, c.status, u.name from USER as u \
            join `SCHEDULE` as s \
            on s.transport_id = u.id \
            join ORDERS as o \
            on s.order_id = o.id \
            join CUSTOMER_OPERATOR as c \
            on c.id = o.request_id and (c.status = \'completed\' or c.status = \'in progress\') \
            where u.id = ? \
            group by status \
            order by status'
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
    static async getShippingDetail(shipping_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select count(status) as `count_status`, u.id, c.status, u.name from USER as u \
            join `SCHEDULE` as s \
            on s.shipping_id = u.id \
            join ORDERS as o \
            on s.order_id = o.id \
            join CUSTOMER_OPERATOR as c \
            on c.id = o.request_id and (c.status = \'completed\' or c.status = \'in progress\') \
            where u.id = ? \
            group by status \
            order by status'
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
    
    static async getScheduleDetailByShipping(shipping_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select c.status, u.name as customer_name, s.id as schedule_id, o.id as order_id from SCHEDULE as s \
            join ORDERS as o \
            on o.id = s.order_id \
            join CUSTOMER_OPERATOR as c \
            on c.id = o.request_id \
            join USER as u \
            on u.id = c.customer_id \
            where s.shipping_id = ?'
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
}

module.exports = Schedule
