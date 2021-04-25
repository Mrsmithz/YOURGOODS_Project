const pool = require('../database/mysql_connector')

class Location{
    constructor(id, location, driver_id, order_id){
        this.id = id
        this.location = location
        this.driver_id = driver_id
        this.order_id = order_id
    }
    async addLocation(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into LOCATIONS (location, driver_id, order_id) values(?,?,?)'
            let result = await conn.query(stmt, [this.location, this.driver_id, this.order_id])
            this.id = result[0].insertId
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
    async getLocationByDriverId(driver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from LOCATIONS where driver_id = ?'
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
    async getLocationByOrderId(order_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from LOCATIONS where order_id = ?'
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
}
module.exports = Location
