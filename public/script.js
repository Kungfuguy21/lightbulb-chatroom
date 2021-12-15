
setInterval(function () {
	$.get("/status", function (light) {
		if (light == "1")
			$("body").css('background','white');
		if (light == "0")
			$("body").css('background','black');
	});
}, 2000);

// $('#aButton').click(function() {
// 	$.get("/change");
// });

let socket = io(); 

// 1: send 'newMessage' & message contents when the user hits some kinda "send" button

// detect when user clicks send button
$('#sendButton').click( () => {
	let theMessage = $('#message').val();
	socket.emit('newMessage', theMessage);
} );

// 2: listen for 'thereIsANewMessage' & put the contents somewhere the user can see them
socket.on('thereIsANewMessage', (message_contents) => {
	alert(message_contents);
	Messages[messagecount] = "message_contents"; 
    messagecount = messagecount+1; 
}); 

//3: database

socket.on('AllMessages', (message_contents) => {
	for (let i = 0; i < message_contents.length; i++) {
		$('#MessageList').append('<li>'+message_contents[i]+'</li>');
	}
}); 

