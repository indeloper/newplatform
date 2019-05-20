var http = require('http');
var express = require('express');
var path = require('path');
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var session = require("express-session");
var MongoStore = require("connect-mongodb-session")(session);
var socketIO = require('socket.io');

var routes = require('./routes/index');

var app = express();
var server = http.createServer(app)
var io = socketIO(server)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true })      

var store = new MongoStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
  });
var sessionMiddleware = session({
    store: store, // XXX redis server config
    secret: "keyboard cat",
  });

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

mongoClient.connect((err, client)=>{
    if (err) return console.log(err)
    dbClient = client
    app.locals.collectionUsers = client.db("database").collection("users")
    app.locals.collectionCatalog = client.db("database").collection("catalog")
    app.locals.collectionList = client.db("database").collection("roomlist")
  })

server.listen(3000)