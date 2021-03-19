const Staff = require("./Staff");
const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Supervisor extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address){
        super(id, username, password, staff_id, name, email, tel, gender, address, 'supervisor')
    }
    async createSupervisorAccount(){
        var stmt = 'insert into Supervisor(staff_id) values(?)'
        return await mysql_query(stmt, [this.staff_id])
    }
    async getSupervirsorData(){
        var stmt = 'select * from User as u \
                    inner join Staff as s \
                    on s.account_id = u.account_id \
                    inner join Supervisor as sup \
                    on s.staff_id = sup.staff_id \
                    where u.account_id = ?'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.account_id])))[0]
            this.user_type = data.user_type
            this.staff_id = data.staff_id
            this.staff_name = data.staff_name
            this.staff_email = data.staff_email
            this.staff_tel = data.staff_tel
            this.staff_gender = data.staff_gender
            this.staff_address = data.staff_address
            this.staff_type = data.staff_type
            return Promise.resolve(this.account_id)
        }
        catch (err){
            return Promise.reject(err)
        }
    }
}


module.exports = Supervisor
