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
            var check_stmt = 'select plate_number from VEHICLE where plate_number = ?'
            let [plate, cols] = await conn.query(check_stmt, [this.plate_number])
            if (plate.length > 0){
                return Promise.reject('Plate Number Already Exists')
            }
            var stmt = 'insert into VEHICLE (plate_number, name, type, brand, manage_by) \
            values(?,?,?,?,?)'
            let result = await conn.query(stmt, [this.plate_number, this.name, this.type, this.brand, this.manage_by])
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
    static async getAllVehicleByManagerId(manager_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from VEHICLE where manage_by = ?'
            let [rows, fields] = await conn.query(stmt, [manager_id])
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
    static async editVehicle(plate_number, new_plate_number, name, type, brand){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            if (plate_number != new_plate_number){
                var check_stmt = 'select plate_number from VEHICLE where plate_number = ?'
                let [plate, cols] = await conn.query(check_stmt, [new_plate_number])
                if (plate.length > 0){
                    return Promise.reject('Plate Number Already Exists')
                }
            }
            var stmt = 'select id from SCHEDULE where vehicle_plate_number = ?'
            let [rows, fields] = await conn.query(stmt, [plate_number])
            var stmt2 = 'update SCHEDULE set vehicle_plate_number = null where vehicle_plate_number = ?'
            await conn.query(stmt2, [plate_number])
            var stmt3 = 'update VEHICLE set plate_number = ?, name = ?, type = ?, brand = ? where plate_number = ?'
            await conn.query(stmt3, [new_plate_number, name, type, brand, plate_number])
            var stmt4 = 'update SCHEDULE set vehicle_plate_number = ? where id = ?'
            for (let item of rows){
                await conn.query(stmt4, [new_plate_number, item.id])
            }
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
    static async updateVehicleStatus(plate_number, status){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update VEHICLE set status = ? where plate_number = ?'
            if (status == 'not_available'){
                var stmt2 = 'update SCHEDULE set vehicle_plate_number = null where vehicle_plate_number = ?'
                await conn.query(stmt2, [plate_number])
            }
            let result = await conn.query(stmt, [status, plate_number])
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
    static async deleteVehicle(plate_number){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update SCHEDULE set vehicle_plate_number = null where vehicle_plate_number = ?'
            var stmt2 = 'DELETE from VEHICLE where plate_number = ?'
            var stmt3 = 'delete FROM VEHICLE as v \
            WHERE NOT EXISTS (SELECT vehicle_plate_number as plate_number \
            FROM SCHEDULE as s WHERE v.plate_number = s.vehicle_plate_number) and plate_number = ?'
            let result = await conn.query(stmt3, [plate_number])
            if (result[0].affectedRows == 0){
                return Promise.reject('Cannot Delete Vehicle While Vehicle is Assigned')
            }
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
