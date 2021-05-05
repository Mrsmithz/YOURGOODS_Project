const User = require("../model/User");
const Schedule = require("../model/Schedule");
exports.userLogin = async (req, res, next) => {
  try {
    var user = new User();
    await user.userLogin(req.body.username, req.body.password);
    req.session.user = user;
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
exports.getSession = async (req, res) => {
  if (req.session.user) {
    // console.log(`${req.session.user.username} has session`)
    console.log(req.session);
    res.status(200).send(req.session.user);
  } else {
    res.sendStatus(404);
  }
};
exports.destroySession = async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

exports.createAccount = async (req, res, next) => {
  try {
    let data = req.body;
    if (data.secret_key) {
      if (data.secret_key != "staff_secret") {
        res.status(400).send("secret key invalid");
        return;
      }
    }
    let user = new User(
      null,
      data.username,
      data.password,
      data.name,
      data.email,
      data.gender,
      data.telephone,
      data.address,
      data.type,
      data.manage_by
    );
    await user.checkUsernameDuplicate(data.username);
    await user.checkEmailDuplicate(data.email);
    if (data.manage_by != undefined) {
      await user.checkSupervisorId(data.manage_by);
    }
    await user.createAccount();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
exports.updateUserPassword = async (req, res, next) => {
  try {
    let id = req.session.user.id;
    let data = req.body;
    let user = new User();
    await user.updateUserPassword(id, data.old_password, data.new_password);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.updateUserProfile = async (req, res, next) => {
  try {
    let id = req.session.user.id;
    let data = req.body;
    let user = new User();
    await user.updateUserProfile(
      id,
      data.name,
      data.telephone,
      data.address
    );
    await user.getUserById(id)
    req.session.user = user
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.updateUserEmail = async (req, res) => {
  try {
    let id = req.session.user.id;
    let user = new User();
    await user.checkEmailDuplicate(req.body.new_email);
    await user.updateUserEmail(id, req.body.old_email, req.body.new_email);
    await user.getUserById(id)
    req.session.user = user
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.getStaffDetail = async (req, res) => {
  try {
    let result = await User.getStaffManageBy(req.session.user.id);
    for (let staff of result) {
      let detail;
      if (staff.type == "driver") {
        detail = await Schedule.getDriverDetail(staff.id);
      }
      if (staff.type == "operator") {
        detail = await Schedule.getOperatorDetail(staff.id);
      }
      if (staff.type == "transport") {
        detail = await Schedule.getTransportDetail(staff.id);
      }
      if (staff.type == "shipping") {
        detail = await Schedule.getShippingDetail(staff.id);
      }
      if (detail) {
        for (let item of detail) {
          if (item.status == "in progress") {
            staff.in_progress = item.count_status;
          } else {
            staff[item.status] = item.count_status;
          }
        }
      }
    }
    res.status(200).send(result)
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.getCustomerOrOperatorDashboard = async (req, res) => {
    try{
        let result = await User.getCustomerOrOperatorDashboard(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

exports.getStaffDashboard = async (req, res) => {
    try{
        let result = await User.getStaffDashboard(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getSupervisorDashboard = async (req, res) => {
    try{
        let result = await User.getSupervisorDashboard(req.session.user.id)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
