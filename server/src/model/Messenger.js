const Staff = require("./Staff");

class Messenger extends Staff{
    constructor(id, username, password, staff_id, name, email, tel, gender, address, vehicle_id, ordermanager_id){
        super(id, username, password, staff_id, name, email, tel, gender, address)
        this.ordermanager_staff_id = ordermanager_id
        this.vehicle_id = vehicle_id
    }
}

module.exports = Messenger
