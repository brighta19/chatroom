/*global io returnDate $*/
var socket = io.connect(window.location.href);

$('#submit').on('click', function() {
    var username = $('input[name=Username]');
    var message = $('input[name=Message]');
    if (username.val() == "" || message.val() == "") {
        alert('Your username or message is empty!');
    }
    else {
        socket.emit('newMsg', {
            user: username.val(),
            msg: message.val(),
            date: returnDate()
        });
        console.log('Recieved!');
    }
});

$('input[name=Username]').on('input', function() {
    socket.emit('username', $('input[name=Username]').val());
});

function dataHandler(data) {
    var users = data.users;
    var messages = data.messages;
    
    $('#userList').remove();
    var userList = $('<ul id="userList">').appendTo($('#users'));
    for (var user in users) {
        var text = $('<li>').text(users[user]);
        text.appendTo(userList);
    }
    
    $('#messageList').remove();
    var messageList = $('<div id="messageList">').appendTo($('#messages'));
    for (var message in messages) {
        var username = $('<h4 style="text-decoration: underline;">').text(messages[message].user);
        var msg = $('<p>').text(messages[message].msg);
        var date = $('<p style="color: #CCC; text-align: right;">').text(messages[message].date);
        
        messageList.append(username, msg, date, $('<br>'));
    }
}

socket.on('data', dataHandler);
