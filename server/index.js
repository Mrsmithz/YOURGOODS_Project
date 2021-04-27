const express = require("express");
const cors = require("cors");
const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");
const multer = require("multer");
const app = express();
const PORT = 25800;
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({ host: "redis" });
const corsConfig = require("./config/cors-config");
const path = require("path");
const upload = multer();
const AuthRouter = require("./src/routes/AuthRouter");
const ContactsRouter = require("./src/routes/ContactsRouter");
const OrdersRouter = require("./src/routes/OrdersRouter");
const RequestRouter = require("./src/routes/RequestRouter");
const UserRouter = require("./src/routes/UserRouter");
const GoodsRouter = require("./src/routes/GoodsRouter");
const Contacts = require('./src/model/Contact')
const ScheduleRouter = require('./src/routes/ScheduleRouter')
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(cors(corsConfig));
app.use(express.json());
app.use("/statics", express.static(path.join(__dirname, "statics")));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "doggo_doggo",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use((req, res, next) => {
  console.log(`requested at ${req.url} method ${req.method}`);
  next();
});

app.all("/api/*", (req, res, next) => {
  if (req.headers.key == "my_doggo_name_jeff") {
    console.log("API KEY CHECK PASS");
    next();
  } else {
    console.log("API KEY CHECK FAIL");
    res.sendStatus(400);
  }
});
app.use("/api/auth", AuthRouter);

app.all("/api/*", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(400);
  }
});
app.use('/api/schedule', ScheduleRouter)
app.use("/api/user", UserRouter);
app.use("/api/contacts", ContactsRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/request", RequestRouter);
app.use("/api/goods", GoodsRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

const server = app.listen(PORT, () => {
  console.log(`server has started at port : ${PORT}`);
});
const socket = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:25801",
      credentials: true
    },
  });
const event = socket.of('/contacts')
event.on('connection', client => {
    client.on('sent-message', async data => {
        try{
            let contact = new Contacts()
            let result = await contact.sendMessage(data.sender_id, data.receiver_id, data.message)
            event.emit(`new-message-${data.receiver_id}`, result)
            event.emit(`sent-message-${data.sender_id}`, result)
        }
        catch(err){
            console.log(err)
        }
        console.log(data)
    })
    client.on('disconnect', data => {
        console.log('disconnect')
    })
})

module.exports = server;
