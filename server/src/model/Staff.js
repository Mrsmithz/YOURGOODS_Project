const User = require("./User")
const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Staff extends User{
    constructor(id, username, password, staff_id, name, email, tel, gender, address, type){
        super(id, username, password, 'staff')
        this.staff_id = staff_id
        this.staff_name = name
        this.staff_email = email
        this.staff_tel = tel
        this.staff_gender = gender
        this.staff_address = address
        this.staff_type = type
    }
    async createStaffAccount(){
        var stmt = 'insert into Staff(staff_name, staff_email, staff_tel, staff_gender, staff_address, account_id, staff_type) values(?,?,?,?,?,?,?)'
        return await mysql_query(stmt, [this.staff_name, this.staff_email, this.staff_tel, this.staff_gender, this.staff_address, this.account_id, this.staff_type])
    }
    async getStaffData(){
        var stmt = 'select * from Staff where staff_id = ?'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.staff_id])))[0]
            this.staff_id = data.staff_id
            this.staff_name = data.staff_name
            this.staff_email = data.staff_email
            this.staff_tel = data.staff_tel
            this.staff_gender = data.staff_gender
            this.staff_address = data.staff_address
            this.staff_type = data.type
            return Promise.resolve(this.staff_id)
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async getStaffId(){
        var stmt = 'select staff_id from Staff where account_id = ?'
        try{
            var json_string = JSON.stringify(await mysql_query(stmt, [this.account_id]))
            var id = JSON.parse(json_string)[0].staff_id
            this.staff_id = id
            return Promise.resolve(this.staff_id)
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async checkIfEmailDuplicate(){
        var stmt = 'select staff_email from Staff'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt)))
            for(var object of data){
                if (object.staff_email.toLowerCase() == this.staff_email.toLowerCase()){
                    return Promise.reject('Email duplicated')
                }
            }
            return Promise.resolve('Email not duplicated')
        }
        catch(err){
            return Promise.reject(err)
        }
    }
}

module.exports = Staff
