const Vehicle = require('../model/Vehicle')

exports.addVehicle = async (req, res) => {
    try{
        let data = req.body
        let vehicle = new Vehicle(data.plate_number, data.name, data.type, data.brand, req.session.user.id)
        let result = await vehicle.addVehicle()
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
exports.getAllVehicleByManagerId = async (req, res) => {
    try{
        let result = await Vehicle.getAllVehicleByManagerId(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.editVehicle = async (req, res) => {
    try{
        let data = req.body
        let result = await Vehicle.editVehicle(data.plate_number, data.new_plate_number, data.name, data.type, data.brand)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.updateVehicleStatus = async (req, res) => {
    try{
        let data = req.body
        let result = await Vehicle.updateVehicleStatus(data.plate_number, data.status)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.deleteVehicle = async (req, res) => {
    try{
        let result = await Vehicle.deleteVehicle(req.params.plate_number)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
