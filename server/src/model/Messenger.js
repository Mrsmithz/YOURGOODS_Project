const Staff = require("./Staff");
const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Messenger extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address, vehicle_id, ordermanager_id){
        super(id, username, password, staff_id, name, email, tel, gender, address, 'messenger')
        this.ordermanager_staff_id = ordermanager_id
    }
    async createMessengerAccount(){
        var stmt = 'insert into Messenger(staff_id, order_manager_staff_id) values(?,?)'
        return await mysql_query(stmt, [this.staff_id, this.ordermanager_staff_id])
    }
    async getMessengerData(){
        var stmt = 'select * from User as u \
                    inner join Staff as s \
                    on s.account_id = u.account_id \
                    inner join Messenger as m \
                    on m.staff_id = s.staff_id \
                    where u.account_id = ?'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.account_id])))[0]
            this.staff_id = data.staff_id
            this.user_type = data.user_type
            this.staff_type = data.staff_type
            this.staff_name = data.staff_name
            this.staff_email = data.staff_email
            this.staff_tel = data.staff_tel
            this.staff_gender = data.staff_gender
            this.staff_address = data.staff_address
            return Promise.resolve(this.account_id)
        }
        catch(err){
            return Promise.reject(err)
        }
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
}

module.exports = Messenger
