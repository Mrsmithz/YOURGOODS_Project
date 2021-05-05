const Feedback = require('../model/Feedback')

exports.createFeedback = async (req, res) => {
    try{
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