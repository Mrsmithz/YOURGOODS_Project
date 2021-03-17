const User = require("./User")

class Staff extends User{
    constructor(id, username, password, staff_id, name, email, tel, gender, address){
        super(id, username, password)
        this.staff_id = staff_id
        this.staff_name = name
        this.staff_email = email
        this.staff_tel = tel
        this.staff_gender = gender
        this.staff_address = address
    }
}

module.exports = Staff
