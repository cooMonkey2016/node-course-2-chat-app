var socket = io();
socket.on('connect', function () {
    console.log('Connected to server!');

    /* socket.emit('createEmail',{
        to: 'jen@example.com',
        text: 'this is andrew'
    }); */
    /* socket.emit('createMessage',{
        from: 'andrew',
        text: 'Yup , that works for me'
    }); */
});
socket.on('disconnect',function () {
    console.log('Disconnect from server!');
});

/* socket.on('newEmail', function (email) {
    console.log('New Email',email);
}); */
socket.on('newMessage',function (message) {
    console.log('newMessage',message);
});