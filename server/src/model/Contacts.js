const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Contacts{
    constructor(contacts_id, sender_id, receiver_id, message, sent_datetime){
        this.contacts_id = contacts_id
        this.sender_id = sender_id
        this.receiver_id = receiver_id
        this.message = message
        this.sent_datetime = sent_datetime
    }
    async createContacts(){
        var stmt = 'insert into Contacts(sender_id, receiver_id, message) values(?,?,?)'
        return await mysql_query(stmt, [this.sender_id, this.receiver_id, this.message])
    }
    async getAllContactsBySender(){
        var stmt = 'select * from Contacts where sender_id = ?'
        return await mysql_query(stmt, [this.sender_id])
    }
    async getAllContactsByReceiver(){
        var stmt = 'select * from Contacts where receiver_id = ?'
        return await mysql_query(stmt, [this.receiver_id])
    }
}

module.exports = Contacts
