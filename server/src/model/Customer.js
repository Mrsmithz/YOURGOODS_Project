const pool = require('../database/mysql_connector')
const User = require('./User')
class Customer extends User{
    constructor(id, username, password, name, email, gender, telephone, address, type){
        super(id, username, password, name, email, gender, telephone, address, type)
    }
    async createRequest(document, status, customer_id, operator_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into CUSTOMER_OPERATOR (document, status, customer_id, operator_id) \
            values(?,?,?,?)'
            let result = await conn.query(stmt, [document, status, customer_id, operator_id])
            await conn.commit()
            return Promise.resolve(result[0].insertId)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getRequestById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from CUSTOMER_OPERATOR where id = ?'
            let [rows, fields] = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getAllRequestByCustomerId(customer_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from CUSTOMER_OPERATOR where customer_id = ?'
            let [rows, fields] = await conn.query(stmt, [customer_id])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async deleteRequestById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'delete from CUSTOMER_OPERATOR where id = ?'
            await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve()
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async editRequest(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update CUSTOMER_OPERATOR set document = ? where id = ?'
            await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve()
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

module.exports = Customer
