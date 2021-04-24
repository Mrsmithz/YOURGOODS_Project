const multer = require('multer')
const path = require('path')
let storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './statics/uploads')
    },
    filename: function(req, file, callback){
        callback(null, `${req.session.user.id}-${file.fieldname}-\`${file.originalname}\`-${Date.now()}${path.extname(file.originalname)}`)
    }
})
module.exports = multer({storage: storage})
