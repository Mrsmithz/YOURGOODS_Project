const express = require('express')
const cors = require('cors')
const redis = require('redis')
const connectRedis = require('connect-redis')
const session = require('express-session')
const app = express()
const PORT = 25800
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({host:'redis'})
const corsConfig = require('./config/cors-config')

const AuthRouter = require('./src/routes/AuthRouter')
const ContactsRouter = require('./src/routes/ContactsRouter')
const OrdersRouter = require('./src/routes/OrdersRouter')
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

app.use(cors(corsConfig))
app.use(express.json())
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret:'doggo_doggo',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:false,
        maxAge: 1000 * 60 * 1
    }
}))

app.use((req, res, next) => {
    console.log(`requested at ${req.url} method ${req.method}`)
    next()
})


app.all('/api/*', (req, res, next) => {
    console.log(req.body)
    if (req.body.api_key == "my_doggo_name_jeff"){
        console.log("API KEY CHECK PASS")
        next()
    }
    else{
        console.log("API KEY CHECK FAIL")
        res.sendStatus(400)
    }
})
app.use('/api/auth', AuthRouter)
app.use('/api/contacts', ContactsRouter)
app.use('/api/orders', OrdersRouter)

app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(PORT, () => {
    console.log(`server has started at port : ${PORT}`)
})
