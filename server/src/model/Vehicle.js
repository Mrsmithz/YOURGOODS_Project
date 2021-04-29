const pool = require('../database/mysql_connector')

class Vehicle{
    constructor(plate_number, name, type, brand, manage_by, status){
        this.plate_number = plate_number
        this.name = name
        this.type = type
        this.brand = brand
        this.manage_by = manage_by
        this.status = status
    }
    async addVehicle(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into VEHICLE (plate_number, name, type, brand, manage_by, status) \
            values(?,?,?,?,?,?)'
            let result = await conn.query(stmt, [this.plate_number, this.name, this.type, this.brand, this.manage_by, this.status])
            let stmt2 = 'select * from VEHICLE where plate_number = ?'
            let [rows, fields] = await conn.query(stmt2, [this.plate_number])
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
    static async getAllVehicleByManagerId(manager_id, status){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from VEHICLE where manage_by = ? and status = ?'
            let [rows, fields] = await conn.query(stmt, [manager_id, status])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    static async getVehicleById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from VEHICLE where id = ?'
            let [rows, fields] = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    static async editVehicle(id, plate_number, name, type, brand, manage_by){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update VEHICLE set plate_number = ?, name = ?, type = ?, brand = ?, manage_by = ? where id = ?'
            let result = await conn.query(stmt, [plate_number, name, type, brand, manage_by, id])
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
    static async deleteVehicle(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'DELETE from VEHICLE where id = ?'
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

module.exports = Vehicle
