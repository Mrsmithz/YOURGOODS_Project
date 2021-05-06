const Feedback = require('../model/Feedback')
const Joi = require('joi')
const createFeedbackSchema = Joi.object({
    comment:Joi.string().required()
})
exports.createFeedback = async (req, res) => {
    try{
        await createFeedbackSchema.validateAsync(req.body, { abortEarly: false })
        let feedback = new Feedback(null, req.body.comment, req.session.user.id)
        await feedback.createFeedback()
        res.status(201).send(feedback)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getLatestFeedback = async (req, res) => {
    try{
        let result = await Feedback.getLatestFeedback()
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}