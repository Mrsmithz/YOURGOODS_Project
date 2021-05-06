const User = require("../model/User");
const Schedule = require("../model/Schedule");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const SaltRounds = 5;
const passwordValidator = (value, helpers) => {
  if (!value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
    throw new Joi.ValidationError(
      "Password must contain at least lowercase letter, one number, and one uppercase letter and has at least 8 characters"
    );
  }
  return value;
};
const emailValidator = (value, helpers) => {
  if (
    !value.match(
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw new Joi.ValidationError("Email is invalid");
  }
  return value;
};
const SignupSchema = Joi.object({
  username: Joi.string().required().min(6).max(255),
  password: Joi.string().required().min(8).max(255).custom(passwordValidator),
  email: Joi.string().required().custom(emailValidator),
  name: Joi.string().required().max(255),
  gender: Joi.string().required().valid("Male", "Female", "Other"),
  address: Joi.string().required().max(255),
  telephone: Joi.string()
    .required()
    .pattern(/^0\d{9}$/),
  type: Joi.string()
    .required()
    .valid(
      "Customer",
      "Supervisor",
      "Operator",
      "Driver",
      "Transport",
      "Shipping"
    ),
  manage_by: Joi.any().when("type", [
    { is: "Operator", then: Joi.required() },
    { is: "Driver", then: Joi.required() },
    { is: "Transport", then: Joi.required() },
    { is: "Shipping", then: Joi.required() },
  ]),
  secret_key: Joi.any().when("type", [
    { is: "Supervisor", then: Joi.required() },
    { is: "Operator", then: Joi.required() },
    { is: "Driver", then: Joi.required() },
    { is: "Transport", then: Joi.required() },
    { is: "Shipping", then: Joi.required() },
  ]),
});
const LoginSchema = Joi.object({
  username: Joi.string().required().max(255),
  password: Joi.string().required().max(255),
});
const UpdatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().required().custom(passwordValidator),
  confirmed_new_password: Joi.string()
    .required()
    .valid(Joi.ref("new_password")),
});
const UpdateProfileSchema = Joi.object({
  name: Joi.string().required().max(255),
  telephone: Joi.string()
    .required()
    .pattern(/^0\d{9}$/),
  address: Joi.string().required().max(255),
});
const UpdateEmailSchema = Joi.object({
  old_email: Joi.string().required(),
  new_email: Joi.string().required().custom(emailValidator),
});
exports.userLogin = async (req, res, next) => {
  try {
    await LoginSchema.validateAsync(req.body, { abortEarly: false });
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
    await SignupSchema.validateAsync(req.body, { abortEarly: false });
    let data = req.body;
    if (data.secret_key) {
      if (data.secret_key != "staff_secret") {
        res.status(400).send("secret key invalid");
        return;
      }
    }
    let hash = await bcrypt.hash(data.password, SaltRounds);
    let user = new User(
      null,
      data.username,
      hash,
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
    await UpdatePasswordSchema.validateAsync(req.body, { abortEarly: false });
    let id = req.session.user.id;
    let data = req.body;
    let user = new User();
    let hash = await bcrypt.hash(data.new_password, SaltRounds)
    await user.updateUserPassword(id, data.old_password, hash);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
exports.updateUserProfile = async (req, res, next) => {
  try {
    await UpdateProfileSchema.validateAsync(req.body, { abortEarly: false });
    let id = req.session.user.id;
    let data = req.body;
    let user = new User();
    await user.updateUserProfile(id, data.name, data.telephone, data.address);
    await user.getUserById(id);
    req.session.user = user;
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.updateUserEmail = async (req, res) => {
  try {
    await UpdateEmailSchema.validateAsync(req.body, { abortEarly: false });
    let id = req.session.user.id;
    let user = new User();
    await user.checkEmailDuplicate(req.body.new_email);
    await user.updateUserEmail(id, req.body.old_email, req.body.new_email);
    await user.getUserById(id);
    req.session.user = user;
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
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
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.getCustomerOrOperatorDashboard = async (req, res) => {
  const allowed = ["customer", "operator"];
  if (!allowed.includes(req.session.user.type)) {
    return res.status(400).send("No Permission");
  }
  try {
    let result = await User.getCustomerOrOperatorDashboard(req.session.user.id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.getStaffDashboard = async (req, res) => {
  const allowed = ["transport", "shipping", "driver"];
  if (!allowed.includes(req.session.user.type)) {
    return res.status(400).send("No Permission");
  }
  try {
    let result = await User.getStaffDashboard(req.session.user.id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.getSupervisorDashboard = async (req, res) => {
  const allowed = ["supervisor"];
  if (!allowed.includes(req.session.user.type)) {
    return res.status(400).send("No Permission");
  }
  try {
    let result = await User.getSupervisorDashboard(req.session.user.id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
