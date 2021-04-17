const pool = require('../database/mysql_connector')

class Goods{
    constructor(id, name, weight, quantity, order_id){
        this.id = id
        this.name = name
        this.weight = weight
        this.quantity = quantity
        this.order_id = order_id
    }
    async createGoods(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into GOODS (name, weight, quantity, order_id) \
            values(?,?,?,?)'
            let result = await conn.query(stmt, [this.name, this.weight, this.quantity, this.order_id])
            this.id = result[0].insertId
            await conn.commit()
            return Promise.resolve(this.id)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getGoodsById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from GOODS where id = ?'
            let [rows, fields] = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getAllGoodsByOrderId(order_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from GOODS where order_id = ?'
            let [rows, fields] = await conn.query(stmt, [order_id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async editGoods(name, weight, quantity, id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update GOODS set name = ?, weight = ?, quantity = ? where id = ?'
            let result = await conn.query(stmt, [name, weight, quantity, id])
            await conn.commit()
            return Promise.resolve(result)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async deleteGoodsById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'delete from GOODS where id = ?'
            let result = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(result)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async deleteGoodsByOrderId(order_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'delete from GOODS where order_id = ?'
            let result = await conn.query(stmt, [order_id])
            await conn.commit()
            return Promise.resolve(result)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
}
module.exports = Goods
