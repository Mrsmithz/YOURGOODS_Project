const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class ProblemAlert{
    constructor(id, message, problem_id){
        this.alert_id = id
        this.message = message
        this.problem_id = problem_id
    }
}


module.exports = ProblemAlert
