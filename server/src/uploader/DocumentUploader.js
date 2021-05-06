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
module.exports = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        let valid_ext = ['.pdf', '.jpg', '.png', '.bmp', '.docx', '.doc', '.ppt', '.txt', '.xls', '.xlsx']
        if (!valid_ext.includes(path.extname(file.originalname))) {
            req.fileValidationError = 'File extention in invalid'
          return cb(null, false, req.fileValidationError);
        }
        cb(null, true);
    }
})
