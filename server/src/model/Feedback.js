const pool = require('../database/mysql_connector')

class Feedback{
    constructor(id, comment, customer_id){
        this.id = id
        this.comment = comment
        this.customer_id = customer_id
    }
}

module.exports = Feedback
