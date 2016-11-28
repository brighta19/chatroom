// Create Express App
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var returnDate = require('./returnDate');

// Get Files for Client When Requested
app.use('/', express.static(__dirname + '/client'));
app.use('/files', express.static(__dirname + '/client/files'));

// Start the Server
server.listen(process.env.PORT || 8000);
console.log('Server started. (' + __dirname + ')\n');


// Start Connection Between Client and Server
var socket = require('socket.io')(server);
var SOCKET_LIST = {};

// When client connects
function onConnection(client) {
    client.id = Math.random();
    SOCKET_LIST[client.id] = client;
    console.log('Client connected.');
    
    client.on('disconnect', function () {
        delete SOCKET_LIST[client.id];
        console.log('Client disconnected.');
    });
    client.on('newMsg', newMsg);
    client.on('username', function(me) {
        SOCKET_LIST[client.id].user = me;
    });
}

// Record/save all messages
var messages = [];
function newMsg(client) {
    messages.push({
        user: client.user,
        msg: client.msg,
        date: client.date
    });
    console.log('Recieved message from: ' + client.user);
}

// Send list of users and messages every second
function update() {
    var userList = [];
    for (var i in SOCKET_LIST) {
        userList.push(SOCKET_LIST[i].user);
    }
    socket.emit('data', {
        messages: messages,
        users: userList
    });
}
setInterval(update, 1000);

socket.on('connection', onConnection);
