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
}


module.exports = Supervisor
