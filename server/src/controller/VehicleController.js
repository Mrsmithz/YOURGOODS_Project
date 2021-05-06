const Vehicle = require('../model/Vehicle')
const Joi = require('joi')
const addVehicleSchema = Joi.object({
    plate_number:Joi.string().required().max(20),
    name:Joi.string().required(),
    type:Joi.string().required(),
    brand:Joi.string().required()
})
const editVehicleSchema = Joi.object({
    plate_number:Joi.string().required().max(20),
    new_plate_number:Joi.string().required().max(20),
    name:Joi.string().required(),
    type:Joi.string().required(),
    brand:Joi.string().required()
})
const updateVehicleStatusSchema = Joi.object({
    plate_number:Joi.string().required().max(20),
    status:Joi.string().required().valid('available', 'not_available')
})
const paramsValidate = Joi.object({
    plate_number:Joi.string().required()
})
exports.addVehicle = async (req, res) => {
    try{
        await addVehicleSchema.validateAsync(req.body, {abortEarly:false})
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
        await editVehicleSchema.validateAsync(req.body, {abortEarly:false})
        let data = req.body
        let result = await Vehicle.editVehicle(data.plate_number, data.new_plate_number, data.name, data.type, data.brand)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
exports.updateVehicleStatus = async (req, res) => {
    try{
        await updateVehicleStatusSchema.validateAsync(req.body, {abortEarly:false})
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
        await paramsValidate.validateAsync(req.params, {abortEarly:false})
        let result = await Vehicle.deleteVehicle(req.params.plate_number)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
