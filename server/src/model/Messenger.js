const Staff = require("./Staff");
const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Messenger extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address, vehicle_id, ordermanager_id){
        super(id, username, password, staff_id, name, email, tel, gender, address, 'messenger')
        this.ordermanager_staff_id = ordermanager_id
        this.vehicle_id = vehicle_id
    }
    async createMessengerAccount(){
        var stmt = 'insert into Messenger(staff_id, order_manager_staff_id, vehicle_id) values(?,?,?)'
        return await mysql_query(stmt, [this.staff_id, this.ordermanager_staff_id, this.vehicle_id])
    }
    async checkOrderManagerId(){
        var stmt = 'select staff_id from Order_manager where staff_id = ?'
        try{
            var json_string = JSON.stringify(await mysql_query(stmt, [this.ordermanager_staff_id]))
            if (JSON.parse(json_string).length > 0){
                var id = JSON.parse(json_string)[0].staff_id
                if (id == this.ordermanager_staff_id){
                    return Promise.resolve(this.ordermanager_staff_id)
                }
                else{
                    return Promise.reject('id is invalid')
                }
            }
            else{
                return Promise.reject('id not found')
            }
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async checkVehicleId(){
        var stmt = 'select vehicle_id from Vehicle where vehicle_id = ?'
        try{
            var json_string = JSON.stringify(await mysql_query(stmt, [this.vehicle_id]))
            if (JSON.parse(json_string).length > 0){
                var id = JSON.parse(json_string)[0].vehicle_id
                if (id == this.vehicle_id){
                    return Promise.resolve(this.vehicle_id)
                }
                else{
                    return Promise.reject(false)
                }
            }
            else{
                return Promise.reject(false)
            }
        }
        catch(err){
            return Promise.reject(err)
        }
    }
}

module.exports = Messenger
