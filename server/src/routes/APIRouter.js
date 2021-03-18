const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('first test api')
})
router.get('/test', (req, res) => {
    res.send('tester')
})
module.exports = router
