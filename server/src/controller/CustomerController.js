const CustomerRequest = require('../model/CustomerRequest')
// const DocumentUploader = require('../uploader/DocumentUploader')

exports.createRequest = async (req, res) => {
   try{
       var request = new CustomerRequest(null, req.file.path, req.body.status, req.body.customer_id, req.body.operator_id)
       await request.createRequest()
       res.status(201).send(request)
   }
   catch(err){
       console.log(err)
       res.sendStatus(400)
   }
}
