const pool = require('../database/mysql_connector')

class Contacts{
    constructor(sender_id, receiver_id, message){
        this.sender_id = sender_id
        this.receiver_id = receiver_id
        this.message = message
    }
    async sendMessage(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into CONTACTS(sender_id, receiver_id, message) values(?,?,?)'
            let result = await conn.query(stmt, [this.sender_id, this.receiver_id, this.message])
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
