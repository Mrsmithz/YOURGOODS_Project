const Location = require('../model/Location')
const Joi = require('joi')
const addLocationSchema = Joi.object({
    location:Joi.string().required(),
    order_id:Joi.number().integer().required()
})
const paramsValidate = Joi.object({
    id:Joi.number().integer().required()
})
exports.addLocation = async (req, res) => {
    try{
        await addLocationSchema.validateAsync(req.body, { abortEarly: false })
        let data = req.body
        let location = new Location(null, data.location, req.session.user.id, data.order_id)
        let result = await location.addLocation()
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getLocationByOrderId = async (req, res) => {
    try{
        await paramsValidate.validateAsync(req.params, { abortEarly: false })
        let result = await Location.getLocationByOrderId(req.params.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}