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

socket.on('newLocationMessage',function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My currrent Location</a>');
    li.text(message.from + ':');
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit',function(e) {
    e.preventDefault();
    var messageTextbox = $('[name=message]');

    socket.emit('createMessage',{
        from: 'User',
        text: $('[name=message]').val()
    },function() {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled','disabled').text('Sending location.....');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});