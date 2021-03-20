const Contacts = require('../model/Contacts')

exports.createContacts = async (req, res) => {
    try{
        var data = req.body
        var receiver_id = parseInt(req.params.receiver_id)
        var contacts = new Contacts(null, data.sender_id, receiver_id, data.message)
        await contacts.createContacts()
        res.status(201).send(contacts)
    }
    catch(err){
        console.log(err)
    }
}
exports.getAllContactsBySender = async (req, res) => {
    try{
        var sender_id = parseInt(req.params.sender_id)
        var contacts = new Contacts(null, sender_id)
        var result = JSON.parse(JSON.stringify(await contacts.getAllContactsBySender()))
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
    }
}
exports.getAllContactsByReceiver = async (req, res) => {
    try{
        var receiver_id = parseInt(req.params.receiver_id)
        var contacts = new Contacts(null, null, receiver_id)
        var result = JSON.parse(JSON.stringify(await contacts.getAllContactsByReceiver()))
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
    }
}
