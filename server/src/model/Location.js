const pool = require('../database/mysql_connector')

class Location{
    constructor(id, location, driver_id, order_id){
        this.id = id
        this.location = location
        this.driver_id = driver_id
        this.order_id = order_id
    }
}
module.exports = Location
