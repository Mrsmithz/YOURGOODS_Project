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

exports.getScheduleDetail = async (req, res) => {
    try{
        let result = await Schedule.getScheduleDetail(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}