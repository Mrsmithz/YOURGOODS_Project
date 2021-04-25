const pool = require('../database/mysql_connector')

class Contacts{
    constructor(id, sender_id, receiver_id, message){
        this.id = id
        this.sender_id = sender_id
        this.receiver_id = receiver_id
        this.message = message
    }
    async sendMessage(sender_id, receiver_id, message){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into CONTACTS(sender_id, receiver_id, message) values(?,?,?)'
            let result = await conn.query(stmt, [sender_id, receiver_id, message])
            this.id = result[0].insertId
            this.sender_id = sender_id
            this.receiver_id = receiver_id
            this.message = message
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
    async getMessageBySender(sender_id, receiver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from CONTACTS where sender_id = ? and receiver_id = ? order by created_datetime'
            let [rows, fields] = await conn.query(stmt, [sender_id, receiver_id])
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
    async getMessageByReceiver(receiver_id, sender_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from CONTACTS where receiver_id = ? and sender_id = ? order by created_datetime'
            let [rows, fields] = await conn.query(stmt, [receiver_id, sender_id])
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
    async getUnReadMessageByReceiver(receiver_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from CONTACTS where receiver_id = ? and status = \'unreaded\''
            let [rows, fields] = await conn.query(stmt, [receiver_id])
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
    async updateMessageStatusByReceiver(status, receiver_id, sender_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update CONTACTS set status = ? where receiver_id = ? and sender_id = ?'
            let result = await conn.query(stmt, [status, receiver_id, sender_id])
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

module.exports = Contacts
