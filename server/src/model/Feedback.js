const pool = require('../database/mysql_connector')

class Feedback{
    constructor(id, comment, customer_id){
        this.id = id
        this.comment = comment
        this.customer_id = customer_id
    }
    async createFeedback(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into FEEDBACK (comment, customer_id) values(?,?)'
            let result = await conn.query(stmt, [this.comment, this.customer_id])
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
    async getFeedbackById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from FEEDBACK where id = ?'
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
    async getFeedbackByCustomerId(customer_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from FEEDBACK where customer_id = ?'
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
    static async getLatestFeedback(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from FEEDBACK order by created_datetime desc limit 10'
            let [rows, fields] = await conn.query(stmt)
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
}

module.exports = Feedback
