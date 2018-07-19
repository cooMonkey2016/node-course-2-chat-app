const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');



const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New user connected');

    /* socket.emit('newEmail',{
        from: 'mike@example.com',
        text: 'Hey, what is going on ?',
        createdBy: 'lijin'
    }); */

    /* socket.on('createEmail',(newEmail) => {
        console.log('createEmail',newEmail);
    }); */
    /* socket.emit('newMessage',{
        from: 'John',
        text: 'see you then',
        createdAt: 123123
    }); */
    // socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    // socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

    socket.on('join',(params,callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required!');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //socket.leave(params.room);
        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name + ' joined ' + params.room));
        callback();
    });

    socket.on('createMessage',(message,callback) => {
        console.log('createMessage',message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        /* socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
        callback();
    });

    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect', () => {
        //console.log('User was disconnected!');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',user.name + ' has left!'));
        }
    });
});

server.listen(port,() => {
    console.log('Server is up on port',port);
});

