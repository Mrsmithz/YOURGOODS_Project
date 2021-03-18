const conn = require('../database/mysql_connector')
const util = require('util')
const mysql_query = util.promisify(conn.query).bind(conn)
class User{
    constructor(id, username, password, type){
        this.account_id = id
        this.account_username = username
        this.account_password = password
        this.type = type
    }
    async createUser(){
        var stmt = 'insert into User(account_username, account_password, type) values(?,?,?)'
        return await mysql_query(stmt, [this.account_username, this.account_password, this.type])
    }
    async login(){
        var stmt = 'select account_id, account_username, account_password, type from User where account_id = ?'
        return await mysql_query(stmt, [this.account_id])
    }
    async logout(){

    }
    async getSession(){

    }
    async getUserId(){
        var stmt = 'select account_id from User where account_username = ?'
        try{
            var json_string = JSON.stringify(await mysql_query(stmt, [this.account_username]))
            var id = JSON.parse(json_string)[0].account_id
            this.account_id = id
            return Promise.resolve(this.account_id)
        }
        catch(err){
            return Promise.reject(err)
        }

    }
}
module.exports = User
