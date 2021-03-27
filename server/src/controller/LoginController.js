const User = require('../model/User')

exports.userLogin = async(req, res, next) => {
    try{
        var user = new User()
        await user.userLogin(req.body.username, req.body.password)
        req.session.user = user
        res.status(200).send(user)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.getSession = async (req, res) => {
    if (req.session.user){
        console.log(`${req.session.user.username} has session`)
        res.status(200).send(req.session.user)
    }
    else{
        res.sendStatus(404)
    }
}
exports.destroySession = async (req, res) => {
    if (req.session.user){
        req.session.destroy()
        res.sendStatus(200)
    }
    else{
        res.sendStatus(404)
    }
}
