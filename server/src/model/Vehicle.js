const conn = require('../database/mysql_connector')
const util = require('util')
const mysql_query = util.promisify(conn.query).bind(conn)
class Vehicle{
    constructor(id, plate_number, brand, type, name, manu_date, staff_id){
        this.vehicle_id = id
        this.staff_id = staff_id
        this.plate_number = plate_number
        this.vehicle_brand = brand
        this.vehicle_type = type
        this.vehicle_name = name
        this.manufacture_date = manu_date
    }
    async createVehicle(){
        var stmt = 'insert into Vehicle(staff_id, plate_number, vehicle_brand, vehicle_type, vehicle_name, manufacture_date) \
                    values(?,?,?,?,?,?)'
        return await mysql_query(stmt, [this.staff_id, this.plate_number, this.vehicle_brand, this.vehicle_type, this.vehicle_name, this.manufacture_date])
    }
    async getVehicleId(){
        var stmt = 'select vehicle_id from Vehicle where plate_number = ?'
        try{
            var result = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.plate_number])))[0]
            this.vehicle_id = result.vehicle_id
            return Promise.resolve(this.vehicle_id)
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async updateVehicle(){
        var stmt = 'update Vehicle \
                    set staff_id = ?, plate_number = ?, vehicle_brand = ?, \
                    vehicle_type = ?, vehicle_name = ?, manufacture_date = ? \
                    where vehicle_id = ?'
        return await mysql_query(stmt, [this.staff_id, this.plate_number, this.vehicle_brand, this.vehicle_type, this.vehicle_name, this.manufacture_date, this.vehicle_id])
    }
    async deleteVehicle(){
        var stmt = 'delete from Vehicle where vehicle_id = ?'
        return await mysql_query(stmt, [this.vehicle_id])
    }
}

module.exports = Vehicle
