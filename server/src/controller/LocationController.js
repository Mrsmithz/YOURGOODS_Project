const Location = require('../model/Location')

exports.addLocation = async (req, res) => {
    try{
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
        let result = await Location.getLocationByOrderId(req.params.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}