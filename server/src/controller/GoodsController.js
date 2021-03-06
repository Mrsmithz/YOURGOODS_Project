const Goods = require('../model/Goods')
const Joi = require('joi')
const createGoodsSchema = Joi.object({
    name:Joi.string().required(),
    weight:Joi.number().required().greater(0),
    quantity:Joi.number().integer().required().min(1),
    order_id:Joi.number().integer().required()
})
const editGoodsSchema = Joi.object({
    name:Joi.string().required(),
    weight:Joi.number().required().greater(0),
    quantity:Joi.number().integer().required().min(1),
    order_id:Joi.any()
})
const paramsValidate = Joi.object({
    id:Joi.number().integer().required()
})
exports.createGoods = async (req, res) => {
    try{
        await createGoodsSchema.validateAsync(req.body, { abortEarly: false })
        var data = req.body
        var goods = new Goods(null, data.name, data.weight, data.quantity, data.order_id)
        await goods.createGoods()
        res.status(201).send(goods)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.editGoods = async (req, res) => {
    try{
        await editGoodsSchema.validateAsync(req.body, { abortEarly: false })
        await paramsValidate.validateAsync(req.params, { abortEarly: false })
        var data = req.body
        var goods = new Goods()
        await goods.editGoods(data.name, data.weight, data.quantity, req.params.id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.getGoodsById = async (req, res) => {
    try{
        await paramsValidate.validateAsync(req.params, { abortEarly: false })
        var goods = new Goods()
        let result = await goods.getGoodsById(req.params.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.deleteGoodsById = async (req, res) => {
    try{
        await paramsValidate.validateAsync(req.params, { abortEarly: false })
        var goods = new Goods()
        await goods.deleteGoodsById(req.params.id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.deleteGoodsByOrderId = async (req, res) => {
    try{
        await paramsValidate.validateAsync(req.params, { abortEarly: false })
        var goods = new Goods()
        await goods.deleteGoodsByOrderId(req.params.id)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getAllGoodsByOrderId = async (req, res) => {
    try{
        await paramsValidate.validateAsync(req.params, { abortEarly: false })
        var goods = new Goods()
        let result = await goods.getAllGoodsByOrderId(req.params.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}