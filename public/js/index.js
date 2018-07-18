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
    var li = $('<li></li>');
    li.text('from:' + message.from + ' : ' + message.text);
    $('#messages').append(li);
});


socket.emit('createMessage', {
    from: 'Frank',
    text: 'hello ,new world'
},function (data) {
    console.log('Got it: ',data);
});

$('#message-form').on('submit',function(e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: $('[name=message]').val()
    },function() {

    });
});