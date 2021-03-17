const User = require('./User')

class Customer extends User{
    constructor(id, username, password, cust_id, name, email, tel, address){
        super(id, username, password)
        this.customer_id = cust_id
        this.customer_name = name
        this.customer_email = email
        this.customer_tel = tel
        this.customer_address = address
    }
}

module.exports = Customer
