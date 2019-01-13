var socket = io.connect('http://localhost:4000');
$('form').submit(function(e){
	e.preventDefault();
	// alert("client sending new_message" + $('#m').val());
	const msg = $('#m').val();
	socket.emit('new_message', msg);
	$.post('/post/new', {msg: msg}, function(){});
	$('#m').val('');
});

socket.on('update_message', function(msg){
	// alert("client received update_message"+ msg);
	$('#messages').append('<div>'+ msg +'</div>');
});