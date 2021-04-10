const pool = require('../database/mysql_connector')

class Vehicle{
    constructor(plate_number, name, type, brand, manage_by){
        this.plate_number = plate_number
        this.name = name
        this.type = type
        this.brand = brand
        this.manage_by = manage_by
    }
    async addVehicle(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into VEHICLE (plate_number, name, type, brand, manage_by) \
            values(?,?,?,?,?)'
            let result = await conn.query(stmt, [this.plate_number, this.name, this.type, this.manage_by])
            this.id = result[9].insertId
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
    async getAllVehicleByManagerId(manager_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from VEHICLE where manage_by = ?'
            let [rows, fields] = await conn.query(stmt, [manager_id])
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
    async getVehicleById(id){
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
    async editVehicle(id, plate_number, name, type, brand, manage_by){
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
    async deleteVehicle(id){
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
