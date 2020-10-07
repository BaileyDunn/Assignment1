//var mongo = require("./data/mongo.js")
// mongo.connect(mongo.dbInit());
var express = require('express'); //Used for routing
var app = express();
var http = require('http').Server(app); //used to provide http functionality

const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const request = require('request');

//Adding cross origin support
var cors = require('cors');
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist/Assignment3813ICT'));

const port = 3000;

//setup Socket and listen to server for requests
sockets.connect(io, port);
server.listen(http, port);

//User Related
app.post('/login', require('./router/User/login'));
// app.post('/getUser', require('./router/User/getUser'));
// app.post('/addUpdateUser', require('./router/User/addUpdateUser'));
// //Group Related
// app.post('/getGroup', require('./router/GroupChannel/getGroup'));
// app.post('/addUpdateGroup', require('./router/GroupChannel/addUpdateGroup'));
// //Channel Related
// app.post('/getChannels', require('./router/GroupChannel/getChannels'));