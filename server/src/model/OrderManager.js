const Staff = require("./Staff");

class OrderManager extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address, supervisor_id){
        super(id, username, password, staff_id, name, email, tel, gender, address)
        this.supervisor_staff_id = supervisor_id
    }
}

module.exports = OrderManager
