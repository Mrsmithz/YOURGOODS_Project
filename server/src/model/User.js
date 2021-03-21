const conn = require('../database/mysql_connector')
const util = require('util')
const mysql_query = util.promisify(conn.query).bind(conn)
class User{
    constructor(id, username, password, type){
        this.account_id = id
        this.account_username = username
        this.account_password = password
        this.user_type = type
    }
    async createUser(){
        var stmt = 'insert into User(account_username, account_password, user_type) values(?,?,?)'
        return await mysql_query(stmt, [this.account_username, this.account_password, this.user_type])
    }
    async checkIfUsernameDuplicate(){
        var stmt = 'select account_username from User'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt)))
            for(var object of data){
                if (object.account_username.toLowerCase() == this.account_username.toLowerCase()){
                    return Promise.reject('Username duplicated')
                }
            }
            return Promise.resolve('Username not duplicated')
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async getUserData(){
        var stmt = 'select * from User where account_id = ?'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.account_id])))[0]
            if (this.account_password == data.account_password){
                this.account_id = data.account_id
                this.account_username = data.account_username
                this.account_password = data.account_password
                this.user_type = data.type
                return Promise.resolve(this.account_id)
            }
            else{
                return Promise.reject('password did not match')
            }

        }
        catch(err){
            return Promise.reject(err)
        }
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
