const Vehicle = require('../model/Vehicle')

exports.addVehicle = async (req, res) => {
    try{
        let data = req.body
        let vehicle = new Vehicle(data.plate_number, data.name, data.type, data.brand, req.session.user.id, data.status)
        let result = await vehicle.addVehicle()
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}