const User = require('./User')
const util = require('util')
const conn = require('../database/mysql_connector')
const mysql_query = util.promisify(conn.query).bind(conn)
class Customer extends User{
    constructor(id, username, password, cust_id, name, email, tel, address){
        super(id, username, password, 'customer')
        this.customer_id = cust_id
        this.customer_name = name
        this.customer_email = email
        this.customer_tel = tel
        this.customer_address = address
    }
    getCustomerId(){
        return this.customer_id
    }
    setCustomerId(id){
        this.customer_id = id
    }
    async createCustomerAccount(){
        var stmt = 'insert into Customer(customer_name, customer_email, customer_tel, customer_address, account_id) \
        values(?,?,?,?,?)'
        return await mysql_query(stmt, [this.customer_name, this.customer_email, this.customer_tel, this.customer_address, this.account_id])
    }
    async getCustomerData(){
        var stmt = 'select * from Customer where account_id = ?'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt, [this.account_id])))[0]
            this.customer_id = data.customer_id
            this.customer_name = data.customer_name
            this.customer_email = data.customer_email
            this.customer_tel = data.customer_tel
            this.customer_address = data.customer_address
            return Promise.resolve(this.customer_id)
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async getCustomerIdFromSQL(){
        var stmt = 'select customer_id from Customer where account_id = ?'
        try{
            var json_string = JSON.stringify(await mysql_query(stmt, [this.account_id]))
            var id = JSON.parse(json_string)[0].customer_id
            this.customer_id = id
            return Promise.resolve(this.customer_id)
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    async checkIfEmailDuplicate(){
        var stmt = 'select customer_email from Customer'
        try{
            var data = JSON.parse(JSON.stringify(await mysql_query(stmt)))
            for(var object of data){
                if (object.customer_email.toLowerCase() == this.customer_email.toLowerCase()){
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

module.exports = Customer
