const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 25800
const AuthRouter = require('./src/routes/AuthRouter')
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(`requested at ${req.url} method ${req.method}`)
    next()
})

app.all('/api/*', (req, res, next) => {
    console.log('API KEY CHECKER')
    next()
})
app.use('/api/auth', AuthRouter)

app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(PORT, () => {
    console.log(`server has started at port : ${PORT}`)
})
