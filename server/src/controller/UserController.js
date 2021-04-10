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


exports.createAccount = async (req, res, next) => {
    try{
        let data = req.body
        let user = new User(null, data.username, data.password, data.name, data.email, data.gender,
        data.telephone, data.address, data.type, data.manage_by)
        await user.checkUsernameDuplicate(data.username)
        await user.checkEmailDuplicate(data.email)
        if (data.manage_by != undefined){
            await user.checkSupervisorId(data.manage_by)
        }
        await user.createAccount()
        res.status(201).send(user)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
exports.updateUserPassword = async (req, res, next) => {
    try{
        let id = req.params.id
        let data = req.body
        let user = new User()
        await user.updateUserPassword(id, data.old_password, data.new_password)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
exports.updateUserProfile = async (req, res, next) => {
    try{
        let id = req.params.id
        let data = req.body
        let user = new User()
        await user.updateUserProfile(id, data.name, data.gender, data.telephone, data.address)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
