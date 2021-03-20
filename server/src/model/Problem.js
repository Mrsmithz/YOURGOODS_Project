const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Problem{
    constructor(id, problem_datetime, detail, status, report_datetime, staff_id){
        this.problem_id = id
        this.problem_datetime = problem_datetime
        this.problem_detail = detail
        this.status = status
        this.report_datetime = report_datetime
        this.staff_id = staff_id
    }
}

module.exports = Problem
