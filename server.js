const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/register', function(req, res){
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/list', function(req, res){
    res.sendFile(__dirname + '/public/list.html');
});

const users = [];

io.on('connection', socket => {
    socket.emit('receivedUsers', users);
    socket.on('sendUser', data => {
        users.push(data);
        socket.broadcast.emit('receivedUser', data);
    });
});

server.listen(3000);