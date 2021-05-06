const Request = require("../model/Request");
const Joi = require("joi");
const createRequestSchema = Joi.object({
  status: Joi.string().required().valid("pending"),
});
exports.createRequest = async (req, res) => {
  try {
    if (req.fileValidationError) {
      res.status(400).send(req.fileValidationError);
      return;
    }
    await createRequestSchema.validateAsync(req.body, { abortEarly: false });
    var request = new Request();
    let operator_id = (await request.getOperatorId())[0].id;
    let result = await request.createRequest(
      req.file.path,
      req.body.status,
      req.session.user.id,
      operator_id
    );
    res.status(201).send({
      request_id: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
exports.getRequestById = async (req, res) => {
  try {
    var request = new Request();
    var id = req.params.id;
    let result = await request.getRequestById(id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.getAllRequestByOperatorId = async (req, res) => {
  try {
    let request = new Request();
    let result = await request.getAllRequestByOperatorId(req.session.user.id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.getAllRequestByCustomerId = async (req, res) => {
  try {
    var request = new Request();
    var customer_id = req.session.user.id;
    let result = await request.getAllRequestByCustomerId(customer_id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.deleteRequestById = async (req, res) => {
  try {
    var request = new Request();
    var id = req.params.id;
    await request.deleteRequestById(id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.editRequest = async (req, res) => {
  if (req.fileValidationError) {
    res.status(400).send(req.fileValidationError);
    return;
  }
  try {
    var request = new Request();
    var id = req.params.id;
    await request.editRequest(req.file.path, id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.updateRequestStatus = async (req, res) => {
    const updateRequestStatusSchema = Joi.object({
        status:Joi.string().required().valid('pending', 'completed', 'in progress', 'confirmed', 'unconfirmed', 'reject')
    })
  try {
    await updateRequestStatusSchema.validateAsync(req.body, { abortEarly: false })
    var request = new Request();
    await request.updateRequestStatus(req.params.id, req.body.status);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
exports.getCompletedRequestCount = async (req, res) => {
  try {
    let result = await Request.getCompletedRequestCount(req.session.user.id);
    res.status(200).send(result);
  } catch (err) {
    res.sendStatus(400);
  }
};
