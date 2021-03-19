class Vehicle{
    constructor(id, plate_number, brand, type, name, manu_date, staff_id){
        this.vehicle_id = id
        this.staff_id = staff_id
        this.plate_number = plate_number
        this.vehicle_brand = brand
        this.vehicle_type = type
        this.vehicle_name = name
        this.manufacture_date = manu_date
    }
}

module.exports = Vehicle
