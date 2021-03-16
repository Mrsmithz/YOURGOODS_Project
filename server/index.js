const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 25800
app.use(cors())
app.use((req, res, next) => {
    console.log(`requested at ${req.headers.host} method ${req.method}`)
    next()
})
app.all('/api/*', (req, res, next) => {
    console.log('API KEY CHECKER')
})
app.use('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})


app.listen(PORT, () => {
    console.log(`server has started at port : ${PORT}`)
})
