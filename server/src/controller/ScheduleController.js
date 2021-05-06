const Schedule = require("../model/Schedule");
const Joi = require('joi')
const pool = require('../database/mysql_connector')

const createScheduleSchema = Joi.object({
  pickup_datetime:Joi.date().required().greater('now'),
  order_id:Joi.number().integer().required()
})
const updateScheduleDriverSchema = Joi.object({
  driver_id:Joi.number().integer().required()
})
const updateScheduleVehicleSchema = Joi.object({
  plate_number:Joi.string().required().max(20)
})
const updateScheduleStatusSchema = Joi.object({
  request_id:Joi.number().integer().required(),
  pickup_datetime:Joi.date().required(),
  arrived_datetime:Joi.date().required().greater(Joi.ref('pickup_datetime')),
  status:Joi.string().valid('pending', 'completed', 'in progress', 'confirmed', 'unconfirmed', 'reject')
})
const editPickupScheduleSchema = Joi.object({
  pickup_datetime:Joi.date().required().greater('now')
})
const paramsValidate = Joi.object({
  id:Joi.number().integer().required()
})
exports.createSchedule = async (req, res) => {
  try {
    await createScheduleSchema.validateAsync(req.body, {abortEarly:false})
    let data = req.body;
    let transport_id = (await Schedule.getTransportId()).reduce(
      (previous, current) => {
        return previous.request_count < current ? previous : current;
      }
    ).id;
    let shipping_id = (await Schedule.getShippingId()).reduce(
      (previous, current) => {
        return previous.request_count < current ? previous : current;
      }
    ).id;
    let schedule = new Schedule(
      null,
      data.pickup_datetime,
      data.arrived_datetime,
      null,
      transport_id,
      data.order_id,
      shipping_id,
      null
    );
    let result = await schedule.createSchedule()
    res.status(201).send(result)
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.editPickupSchedule = async (req, res) => {
  try{
    await paramsValidate.validateAsync(req.params, {abortEarly:false})
    await editPickupScheduleSchema.validateAsync(req.body, {abortEarly:false})
    let result = await Schedule.editPickupSchedule(req.params.id, req.body.pickup_datetime)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}
exports.getScheduleByOrder = async (req, res) => {
  try {
    let schedule = new Schedule();
    let result = await schedule.getScheduleByOrder(req.params.id)
    res.status(200).send(result)
  } catch (err) {
      console.log(err)
      res.sendStatus(400)
  }
};
exports.getScheduleById = async (req, res) => {
    try {
      let schedule = new Schedule();
      let result = await schedule.getScheduleById(req.params.id)
      res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
  };

exports.getScheduleInProgressDetail = async (req, res) => {
    try{
        let result = await Schedule.getScheduleInProgressDetail(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getScheduleCompletedDetail = async (req, res) => {
  try{
      let result = await Schedule.getScheduleCompletedDetail(req.session.user.id)
      res.status(200).send(result)
  }
  catch(err){
      console.log(err)
      res.sendStatus(400)
  }
}
exports.getAllDriver = async (req, res) => {
  try{
      let result = await Schedule.getAllDriver()
      res.status(200).send(result)
  }
  catch(err){
      console.log(err)
      res.sendStatus(400)
  }
}
exports.updateScheduleDriver = async (req, res) => {
  try{
    await paramsValidate.validateAsync(req.params, {abortEarly:false})
    await updateScheduleDriverSchema.validateAsync(req.body, {abortEarly:false})
    let result = await Schedule.updateScheduleDriver(req.params.id, req.body.driver_id)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}
exports.updateScheduleVehicle = async (req, res) => {
  try{
    await paramsValidate.validateAsync(req.params, {abortEarly:false})
    await updateScheduleVehicleSchema.validateAsync(req.body, {abortEarly:false})
    let result = await Schedule.updateScheduleVehicle(req.params.id, req.body.plate_number)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}
exports.getScheduleInProgressDetailByDriver = async (req, res) => {
  try{
    let result = await Schedule.getScheduleInProgressDetailByDriver(req.session.user.id)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}
exports.getScheduleCompletedDetailByDriver = async (req, res) => {
  try{
    let result = await Schedule.getScheduleCompletedDetailByDriver(req.session.user.id)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}
exports.updateScheduleStatus = async (req, res) => {
  try{
    await paramsValidate.validateAsync(req.params, {abortEarly:false})
    await updateScheduleStatusSchema.validateAsync(req.body, {abortEarly:false})
    let data = req.body
    let result = await Schedule.updateScheduleStatus(req.params.id, data.request_id, data.arrived_datetime, data.status)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}
exports.getScheduleDetailByShipping = async (req, res) => {
  try{
    let result = await Schedule.getScheduleDetailByShipping(req.session.user.id)
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}