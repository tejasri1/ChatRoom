var socket = io.connect('http://localhost:4000');
$('form').submit(function(e){
	e.preventDefault();

	//to set username as scoket param
	const username = $('#username').html();
	socket.emit('socket_username', username);

	const msg = $('#m').val();
	socket.emit('new_message', msg);
	$.post('/post/new', {msg, username}, function(){});
	$('#m').val('');
});



socket.on('update_message', function(msg, username){
	// alert("client received update_message"+ msg);
	$('#messages').append('<div>'+ msg +" from socket username "+ username+'</div>');
});