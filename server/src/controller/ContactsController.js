const Contacts = require('../model/Contact')
const Contact = require('../model/Contact')
const User = require('../model/User')
const Joi = require('joi')
const getMessageBySenderSchema = Joi.object({
    receiver_id:Joi.number().integer().required()
})
const getMessageByReceiverSchema = Joi.object({
    sender_id:Joi.number().integer().required()
})
const updateMessageStatusByReceiverSchema = Joi.object({
    sender_id:Joi.number().integer().required(),
    status:Joi.string().required().valid('unreaded', 'readed')
})
const paramsValidate = Joi.object({
    id:Joi.number().integer().required()
})
exports.sendMessage = async (req, res, next) => {
    try{
        let contact = new Contact()
        await contact.sendMessage(req.session.user.id, req.body.receiver_id, req.body.message)
        res.status(201).send(contact)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.getMessageBySender = async (req, res, next) => {
    try{
        await getMessageBySenderSchema.validateAsync(req.body, {abortEarly:false})
        let contact = new Contact()
        let result = await contact.getMessageBySender(req.session.user.id, req.body.receiver_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.getMessageByReceiver = async (req, res, next) => {
    try{
        await getMessageByReceiverSchema.validateAsync(req.body, {abortEarly:false})
        let contact = new Contact()
        let result = await contact.getMessageByReceiver(req.session.user.id, req.body.sender_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.updateMessageStatusByReceiver = async (req, res, next) => {
    try{
        await updateMessageStatusByReceiverSchema.validateAsync(req.body, {abortEarly:false})
        let contact = new Contact()
        let result = await contact.updateMessageStatusByReceiver(req.body.status, req.session.user.id, req.body.sender_id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getNameById = async (req, res, next) => {
    try{
        await paramsValidate.validateAsync(req.params, {abortEarly:false})
        let user = new User()
        let result = await user.getNameById(req.params.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getUnReadMessageByReceiver = async(req, res, next) => {
    try{
        let contact = new Contacts()
        let result = await contact.getUnReadMessageByReceiver(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}