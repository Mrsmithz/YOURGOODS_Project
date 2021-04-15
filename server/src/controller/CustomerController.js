const Customer = require('../model/Customer')
// const DocumentUploader = require('../uploader/DocumentUploader')

exports.createRequest = async (req, res) => {
   try{
       var customer = new Customer()
       let result = await customer.createRequest(req.file.path, req.body.status, req.body.customer_id, req.body.operator_id)
       res.status(201).send({
           request_id:result
       })
   }
   catch(err){
       console.log(err)
       res.sendStatus(400)
   }
}
exports.getRequestById = async (req, res) => {
    try{
        var customer = new Customer()
        var id = req.params.id
        let result = await customer.getRequestById(id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.getAllRequestByCustomerId = async(req, res) => {
    try{
        var customer = new Customer()
        var customer_id = req.session.user.id
        let result = await customer.getAllRequestByCustomerId(customer_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.deleteRequestById = async (req, res) => {
    try{
        var customer = new Customer()
        var id = req.params.id
        await customer.deleteRequestById(id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.editRequest = async (req, res) => {
    try{
        var customer = new Customer()
        var id = req.params.id
        await customer.editRequest(id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}


