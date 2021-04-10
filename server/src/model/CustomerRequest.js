const pool = require('../database/mysql_connector')

class CustomerRequest{
    constructor(id, document, status, customer_id, operator_id){
        this.id = id
        this.document = document
        this.status = status
        this.customer_id = customer_id
        this.operator_id = operator_id
    }
    async createRequest(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into CUSTOMER_OPERATOR (document, status, customer_id, operator_id) \
            values(?,?,?,?)'
            let result = await conn.query(stmt, [this.document, this.status, this.customer_id, this.operator_id])
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
    async getRequest(id){
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
    async getAllRequest(customer_id){
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
    async deleteRequest(id){
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
}

module.exports = CustomerRequest
