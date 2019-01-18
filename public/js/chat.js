var socket = io.connect('http://localhost:4000');
$('form').submit(function(e){
	e.preventDefault();

	//to set username as scoket param
	const username = $('#username').html();
	socket.emit('socket_username', username);

	const msg = $('#btn-input').val();
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var date = time.getDate();
	var hour = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	const timestamp = month+"."+date+"."+year + " | " + hour+":"+minutes;

	socket.emit('new_message', {msg, timestamp});
	$.post('/post/new', {msg, username, timestamp}, function(){});
	$('#btn-input').val('');

});



socket.on('update_message', function(req){
	// alert("client received update_message"+ msg);
	const curr_username = $('#username').html();

	if(req.username == curr_username) {
		const str = `<div class="row msg_container base_sent">
					<div class="col-md-6">
						<div class="messages msg_sent">
							<p>` + req.msg + `</p>
							<time> ` + req.username +" | " + req.timestamp + `</time>
						</div>
					</div>
				</div>`;
		$('#messages').append(str);
	} else{
		const str = `<div class="row msg_container base_receive">
					<div class="col-md-6">
						<div class="messages msg_receive">
							<p>` + req.msg + `</p>
							<time> ` + req.username +" | " + req.timestamp + `</time>
						</div>
					</div>
				</div>`;
		$('#messages').append(str);
	}
	$(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight}, 1000);

	
});