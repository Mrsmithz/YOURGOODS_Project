const Staff = require("./Staff");

class Supervisor extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address){
        super(id, username, password, staff_id, name, email, tel, gender, address)
    }
}


module.exports = Supervisor
