const http           = require('http');
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const socketIO       = require('socket.io');
const session        = require("express-session");
const MongoStore     = require("connect-mongodb-session")(session);
const path           = require('path');
const port = 8000;

var routes = require('./app/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);
var io = socketIO(server);

var mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true })  

var store = new MongoStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
  });
  
var sessionMiddleware = session({
    store: store, // XXX redis server config
    secret: "keyboard cat",
  });
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', routes);

mongoClient.connect((err, client)=>{
  if (err) return console.log(err);
  dbClient = client;
  app.locals.client = client;
  app.locals.collectionUsers = client.db("database").collection("users");
  app.locals.collectionCatalog = client.db("database").collection("catalog");
  app.locals.collectionList = client.db("database").collection("roomlist");
})

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

io.on('connection', (socket)=>{
    
  });
//require('./app/routes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
  });