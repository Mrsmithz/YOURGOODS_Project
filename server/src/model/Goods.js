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
    async createGoods(){
        var stmt = 'insert into Goods(goods_name, goods_type, goods_quantity, goods_status, order_id) \
        values(?,?,?,?,?)'
        return await mysql_query(stmt, [this.goods_name, this.goods_type, this.goods_quantity, this.goods_status,
        this.order_id])
    }
    async getAllGoods(){
        var stmt = 'select * form Goods where order_id = ?'
        return await mysql_query(stmt, [this.order_id])
    }
}

module.exports = Goods
