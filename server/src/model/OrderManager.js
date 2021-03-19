const Staff = require("./Staff");
const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class OrderManager extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address, supervisor_id){
        super(id, username, password, staff_id, name, email, tel, gender, address, 'order_manager')
        this.supervisor_staff_id = supervisor_id
    }
    async createOrderManagerAccount(){
        var stmt = 'insert into Order_manager(staff_id, supervisor_staff_id) values(?,?)'
        return await mysql_query(stmt, [this.staff_id, this.supervisor_staff_id])
    }
    async getOrderManagerData(){
        var stmt = 'select * from User as u \
                    inner join Staff as s \
                    on s.account_id = u.account_id \
                    inner join Order_manager as manager \
                    on manager.staff_id = s.staff_id \
                    where u.account_id = ?'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.account_id])))[0]
            this.user_type = data.user_type
            this.staff_type = data.staff_type
            this.staff_name = data.staff_name
            this.staff_email = data.staff_email
            this.staff_tel = data.staff_tel
            this.staff_gender = data.staff_gender
            this.staff_address = data.staff_address
            this.staff_id = data.staff_id
            return Promise.resolve(this.supervisor_staff_id)
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async checkSupervirsorId(){
        var stmt = 'select staff_id from Supervisor where staff_id = ?'
        try{
            var json_string = JSON.stringify(await mysql_query(stmt, [this.supervisor_staff_id]))
            if (JSON.parse(json_string).length > 0){
                var id = JSON.parse(json_string)[0].staff_id
                if (id == this.supervisor_staff_id){
                    return Promise.resolve(this.supervisor_staff_id)
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

module.exports = OrderManager
