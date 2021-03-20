const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Goods{
    constructor(id, name, type, quantity, status, order_id){
        this.goods_id = id
        this.goods_name = name
        this.goods_type = type
        this.goods_quantity = quantity
        this.goods_status = status
        this.order_id = order_id
    }
}

module.exports = Goods
