const Schedule = require("../model/Schedule");
exports.createSchedule = async (req, res) => {
  try {
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